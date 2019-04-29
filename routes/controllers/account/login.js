import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import accountService from '../../../services/account.service';
import { emailService } from '../../../services/email.service';

/** Check user access conditions. Email and password must be sent in req.body
 * @res JSON Webtoken valid for 1h, if everything is ok.
 */
export default async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await accountService.getUserByEmail(email);

    const unbanDate = user.loginBlockTime;
    if (unbanDate && unbanDate < Date.now()) {
      // [💩#1] User is banned
      return res.status(401).send(`Account blocked until ${unbanDate.toLocaleString()}`);
    }
    if (!user.verificatedAt) {
      // [💩#2] User tried to login before using activation code
      const newCode = await accountService.resetVerificationCode(user._id);
      emailService.sendEmailRegistration(user.email, newCode);
      return res.status(401).send('You can´t login until you verify your account. A new verification code was sent to your email.');
    }
    if (user.loginAttempts >= 5) {
      // [💩#3] Repeated login attempts. Is user trying brute force?
      accountService.tempBanUserLogin(user.uuid, 30); // todo: use env to set the ban time?
      return res.status(429).send('Reached limit login attempts. Account blocked for 30 minutes!');
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      // [💩#4] User forgot password. TODO - Offer a forgot/reset password link!
      accountService.saveLoginAttempts(user.uuid);
      return res.status(401).send('Invalid password');
    }
    // [👌] Give the user a 1h webtoken, and reset login attempts
    const webtoken1h = jwt.sign({ uuid: user.uuid }, process.env.WEBTOKEN_SECRET, { expiresIn: '1h' });
    if (user.loginAttempts) accountService.resetLoginAttempts(user.uuid);
    return res.json(webtoken1h);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}
