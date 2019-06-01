import account from '../../../../domain/use-cases/account';

/** Check user access conditions. Email and password must be sent in req.body
 * @res JSON Webtoken valid for 1h, if everything is ok.
 */
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await account.loginUC(email, password);
    return res.status(200).send({ ...token, expiresIn: '1h' });
  } catch (e) {
    return next(e);
  }
}

export default login;
