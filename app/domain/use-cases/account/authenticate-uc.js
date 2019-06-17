import jwt from 'jsonwebtoken';
import { AuthErr } from '../../errors/customError';

function authenticateUC(token) {
  const secret = process.env.WEBTOKEN_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    const claims = {
      uuid: decoded.uuid,
    };
    return claims;
  } catch (e) {
    throw AuthErr('NOAUTH', 'The provided token is no longer valid, login to get a new one', 'authentication');
  }
}

export default authenticateUC;
