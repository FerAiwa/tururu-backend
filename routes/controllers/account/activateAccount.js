'use strict';
import { accountService } from '../../../services/account.service';
// Link sent in the confirmation e-mail

/**
 * Given a verification code sent as queryParams. 
 * activates the user and deletes the register from the user_activation.
 */
export default async function activateAccount(req, res) {
  const { verification_code } = req.query
  try {
    const register = await accountService.findVerificationRegister(verification_code);
    const user = await accountService.confirmUser(register.user_uuid)
    return res.status(201).send(`Welcome to the party, ${user.name}`)
  }
  catch (e) {
    return res.status(500).send(e.message)
  }
}