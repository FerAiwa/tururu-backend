import { createAccountUC } from '../../../../domain/use-cases/account';

/** Creates a new account and sends a verification e-mail to the user.
 * @param {Object} req { name, email, password } = req.body
*/
async function createAccount(req, res, next) {
  try {
    const registerData = req.body;
    await createAccountUC(registerData);
    return res.status(201).send();
  } catch (e) {
    return next(e);
  }
}

export default createAccount;
