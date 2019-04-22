'use strict';
import generateUser from './generateUser';
import { accountService } from '../../../services/account.service';
import { emailService } from '../../../services/email.service';

/**
 * Inserts the new user in the db and sends a verification email
 */
export default async function createAccount(req, res) {
  const formData = req.body;
  try {
    const newUser = await generateUser(formData);
    await accountService.insertNewUser(newUser);
    const verificationCode = await accountService.addVerificationCode(newUser._id);
    await emailService.sendEmailRegistration(newUser.email, verificationCode);
  }
  catch (e) {
    return res.status(500).send(e.message)
  }
  return res.status(201).send();
}