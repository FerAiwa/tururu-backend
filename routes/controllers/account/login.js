import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { accountService } from "../../../services/account.service";
import { emailService } from '../../../services/email.service';

/** Check user access conditions. Email and password must be sent in req.body
 * @res JSON Webtoken valid for 1h, if everything is ok.
 */
export default async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (req.headers.authorization) {
      //[💩#0] User is already logged and has a token.
      //TODO- From base64 to object, and use user uuid to redirect to the user profile
      return res.redirect('/template')
    }
    const user = await accountService.getUserByEmail(email);
    if (isUserBanned(user)) {
      //[💩#1] User is banned
      return res.status(401).send(e.message)
    }
    if (!isVerificated(user)) {
      //[💩#2] User tried to login before using activation code
      const newCode = await accountService.resetVerificationCode(user._id);
      emailService.sendEmailRegistration(user.email, newCode);
      //Alternativa: stand-alone page con notificacion + 'resend verification-code'
      return res.status(401).send(e.message)
    }
    if (user.login_attempts >= 5) {
      //[💩#3] Repeated login attempts. Is user using brute force?
      accountService.tempBanUserLogin(email, 30);
      return res.status(429).send('Reached limit attempts. Account blocked for 30 minutes!')
    }
    if (await isDiferentPassword(password, user.password)) {
      //[💩#4] User forgot password
      //TODO - Offer a forgot/reset password link!
      accountService.saveLoginAttempts(user.email);
      return res.status(401).send(e.message)
    }
    //[👌] Give the user a 1h webtoken, login and update audit fields
    //TODO - Reset login attempts
    const webtoken1h = getJSONWebtoken({ _id: user._id });
    return res.json(webtoken1h)
  }
  catch (e) {
    //[💩#5] Can´t find account
    return res.status(500).send(e.message)
  }
}

function getJSONWebtoken(payload) {
  return jwt.sign(payload, process.env.WEBTOKEN_SECRET, { expiresIn: '1h' })
}


async function isDiferentPassword(given, stored) {
  const validation = await bcrypt.compare(given, stored);
  if (!validation) throw new Error('Invalid password')
}

function isVerificated(user) {
  if (!user.verificated_at) throw new Error(
    'You can´t login until you verify your account. A new verification code was sent to your email.'
  )
  return true
}

// WORKING AT THIS -->
function isUserBanned(user) {
  if (!user.login_block_time) return false;
  const banMinutesLeft = 3//Math.round((user.login_block_time - new Date()) * 1000 * 60)
  if (banMinutesLeft > 0) {
    throw new Error(
      `Reached maximun login attempts. Account blocked for ${banMinutesLeft} minutes. Please, wait.`
    )
  }
}
