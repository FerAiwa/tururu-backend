import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CustomErr from '../../../models/customError';
import emailService from '../../email.service';
import User from '../../../models/user';

async function isValidPassword(password, storedPassword) {
  return bcrypt.compare(password, storedPassword);
}
/**
 * Provides a user JWT token if the user gives ok password and passes all access pre-conditions.
 * @param {*} email
 * @param {*} password
 * @returns { Promise<{ accessToken: string, uuid: string, email: string }> } token
 */
async function login(email, password) {
  try {
    const user = await User.findByEmail(email);
    if (!user) throw new CustomErr('NOUSER', 'User doesn´t exist');

    const {
      unbanDate,
      uuid,
      loginAttempts,
      verificatedAt,
    } = user;

    if (unbanDate) {
      if (Date.now() < unbanDate) throw new CustomErr('USERBAN', `Account blocked until ${unbanDate.toLocaleString()}`);
      user.unbanDate = null;
      // user.temporalBan(null);
    }
    if (!verificatedAt) {
      const newCode = await user.resetVerificationCode();
      emailService.sendEmailRegistration(email, newCode);
      throw new CustomErr('NOCODE', 'You can´t login until you verify your account. A new verification code was sent to your email.');
    }
    if (loginAttempts > 4) {
      const minsBan = (loginAttempts * 6); // increasing block time per login
      const unbanDate2 = new Date(Date.now() + (minsBan * 60 * 1000)).toISOString();
      user.unbanDate = unbanDate2;
      user.save();
      throw new CustomErr('MAXPWD', 'Reached limit login attempts. Account blocked for 30 minutes!');
    }
    const validatedPWD = await isValidPassword(password, user.password);
    if (!validatedPWD) {
      user.loginAttempts += 1;
      // user.saveLoginAttempt();
      const attemptsLeft = 4 - loginAttempts;
      throw new CustomErr('BADPWD', `Invalid password. You have ${attemptsLeft} attempts before your account is suspended.`);
    }
    // [👌] Give the user a 1h token & reset login attempts
    if (user.loginAttempts) {
      user.loginAttempts = 0;
      user.save();
      // user.setLoginAttempts(0);
    }
    return {
      accessToken: jwt.sign({ uuid }, process.env.WEBTOKEN_SECRET, { expiresIn: '1h' }),
      email: user.email,
      uuid,
    };
  } catch (e) {
    e.context = 'login';
    throw (e);
  }
}

export default login;
