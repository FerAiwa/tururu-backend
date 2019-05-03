/* eslint no-use-before-define: ["error", { "functions": false } ] */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import accountService from '../../../services/account.service';
import { emailService } from '../../../services/email.service';

/** Check user access conditions. Email and password must be sent in req.body
 * @res JSON Webtoken valid for 1h, if everything is ok.
 */
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await accountService.getUserByEmail(email);
    // If the check fails, triggers logic and throws loginErr
    checkBan(user);
    await checkAccountVerification(user);
    await checkLimitAttempts(user);
    await comparePasswords(password, user);

    // [👌] Give the user a 1h token & reset login attempts
    const token = getToken(user.uuid);
    if (user.loginAttempts) accountService.resetLoginAttempts(user.uuid);
    return res.status(200).json({ accessToken: token, expiresIn: '1h' });
  } catch (e) {
    return next(e); // err sent to account error handler
  }
}

class CustomErr extends Error {
  constructor(code, message, source) {
    super();
    this.code = code;
    this.message = message;
    this.source = source;
  }
}

const loginErr = (code, message) => new CustomErr(code, message, 'login');


function checkBan({ unbanDate }) {
  if (unbanDate && unbanDate < Date.now()) {
    throw loginErr('USERBAN', `Account blocked until  ${unbanDate.toLocaleString()}`);
  }
}
async function checkAccountVerification({ uuid, email, verificatedAt }) {
  if (!verificatedAt) {
    const newCode = await accountService.resetVerificationCode(uuid);
    emailService.sendEmailRegistration(email, newCode);
    throw loginErr('NOCODE', 'You can´t login until you verify your account. A new verification code was sent to your email.');
  }
}
async function checkLimitAttempts({ uuid, loginAttempts }) {
  if (loginAttempts >= 5) {
    accountService.tempBanUserLogin(uuid, 30); // todo: use env to set the ban time?
    throw loginErr('MAXPWD', 'Reached limit login attempts. Account blocked for 30 minutes!');
  }
}
async function comparePasswords(given, user) {
  const { uuid, loginAttempts } = user;
  if (!await bcrypt.compare(given, user.password)) {
    accountService.saveLoginAttempts(uuid);
    const attemptsLeft = 4 - loginAttempts;
    throw loginErr('BADPWD', `Invalid password. You have ${attemptsLeft} attempts before your account is suspended.`);
  }
}
function getToken(uuid) {
  return jwt.sign({ uuid }, process.env.WEBTOKEN_SECRET, { expiresIn: '1h' });
}

export default login;
