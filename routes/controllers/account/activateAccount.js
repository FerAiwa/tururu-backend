'use strict';
import { accountService } from '../../../services/account.service';
import { emailService } from '../../../services/email.service';

/**
 * Given a verification code received as queryParams, 
 * activates the user and deletes the verification_code data.
 */
export default async function activateAccount(req, res) {
  const { verification_code } = req.query;
  try {
    let user = await accountService.getUserByVerificationCode(verification_code);
    const isValidCode = await accountService.isVerificationCodeValid(user.generated_at);
    if (!isValidCode) {
      //[💩#1] User tried expired code link
      const newCode = await accountService.resetVerificationCode(user._id);
      emailService.sendEmailRegistration(user.email, newCode)
      return res.status(400).send('The verification code has expired. A new code was sent to your email.')
    }
    //[👌] Implement redirect to /login
    user = await accountService.activateAccount(user._id);
    return res.status(200).send(`Welcome to the party, ${user.name}`)
  }
  catch (e) {
    return res.status(500).send(e.message)
  }
}