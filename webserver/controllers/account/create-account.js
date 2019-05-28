import accountService from '../../../domain/account.service';

/** Creates a new account */
async function createAccount(req, res, next) {
  const formData = req.body;
  try {
    await accountService.create(formData);
    return res.status(201).send();
  } catch (e) {
    return next(e);
  }
}

export default createAccount;
