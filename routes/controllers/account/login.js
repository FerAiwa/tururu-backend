import bcrypt from 'bcrypt';
import { accountService } from "../../../services/account.service";
import { emailService } from '../../../services/email.service';

export default async function login(req, res) {
  const { email, password } = req.body;
  try {
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
    //[👌] Login and update audit fields
    //TODO - Reset login attempts
    return res.status(200).send(`Welcome ${user.name}!`)
  }
  catch (e) {
    //[💩#5] Can´t find account
    return res.status(500).send(e.message)
  }
}

async function isDiferentPassword(given, stored) {
  const validation = await bcrypt.compare(given, stored);
  if (!validation) throw new Error('Invalid password')
}

function isVerificated(user) {
  if (!user.verificated_at) throw new Error(
    'You can´t login until you verify your account. A new verification code was sent to your email.'
  )
}

// WORKING AT THIS -->
function isUserBanned(user) {
  console.log(user)
  if (!user.login_block_time) return true;
  const banMinutesLeft = 3//Math.round((user.login_block_time - new Date()) * 1000 * 60)
  if (banMinutesLeft > 0) {
    throw new Error(
      `Reached maximun login attempts. Account blocked for ${banMinutesLeft} minutes. Please, wait.`
    )
  }
}
