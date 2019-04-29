import generateUser from './generate-user';
import accountService from '../../../services/account.service';
import { emailService } from '../../../services/email.service';

/** Creates a new account, calls store in db and sends a verification email */
async function createAccount(req, res) {
  const formData = req.body;
  try {
    const newUser = await generateUser(formData);
    await accountService.saveNewUser(newUser);
    await emailService.sendEmailRegistration(newUser.email, newUser.verificationCode);
    return res.status(201).send();
  } catch (e) {
    return res.status(500).send();
  }
}

export default createAccount;
