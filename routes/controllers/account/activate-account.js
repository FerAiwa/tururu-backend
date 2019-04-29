import accountService from '../../../services/account.service';
import { emailService } from '../../../services/email.service';

/**
 * Given a verification code received as queryParams
 * activates the user and deletes the verification_code data.
 */
async function activateAccount(req, res) {
  const { verification_code: verificationCode } = req.query;
  try {
    let user = await accountService.getUserByVerificationCode(verificationCode);
    const isValidCode = await accountService.isVerificationCodeValid(user.generatedAt);
    if (!isValidCode) {
      // [💩#1] User tried expired code link
      const newCode = await accountService.resetVerificationCode(user.uuid);
      emailService.sendEmailRegistration(user.email, newCode);
      return res.status(400).send('The verification code has expired. A new code was sent to your email.');
    }
    // [👌] Implement redirect to /login
    user = await accountService.activateUserAccount(user.uuid);
    return res.status(200).send(`Welcome to the party, ${user.name}`);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default activateAccount;
