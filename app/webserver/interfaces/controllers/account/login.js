import { loginUC } from '../../../../domain/use-cases/account';

/**
 * @param {Object} req { email, password } = req.body
 * - payload { token, uuid, email } Token is valid for 1 hour.
*/
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await loginUC(email, password);
    return res.status(200).send({ ...token, expiresIn: '1h' });
  } catch (e) {
    return next(e);
  }
}

export default login;
