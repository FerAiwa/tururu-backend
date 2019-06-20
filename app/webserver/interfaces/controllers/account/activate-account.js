import { activateAccountUC } from '../../../../domain/use-cases/account';

/**
 * Consumes the verification code to activate the new account.
 * @param {Object} req { verification_code } = req.query
 */
async function activateAccount(req, res, next) {
  const { verification_code: verificationCode } = req.query;
  try {
    await activateAccountUC(verificationCode);
    return res.redirect(`${process.env.SPA_START}`);
  } catch (e) {
    return next(e);
  }
}

export default activateAccount;
