import account from '../../../domain/use-cases/account';

/**
 * Given a verification code received in queryParams,
 * asks accountService to activate the user account
 */
async function activateAccount(req, res, next) {
  const { verification_code: verificationCode } = req.query;
  try {
    await account.activateAccountUC(verificationCode);
    return res.status(200).send();
  } catch (e) {
    return next(e);
  }
}

export default activateAccount;
