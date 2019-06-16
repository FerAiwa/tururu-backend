import jwt from 'jsonwebtoken';
import { CustomErr } from '../../errors/customError';

function authenticateUC(token) {
  const secret = process.env.WEBTOKEN_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    const claims = {
      uuid: decoded.uuid,
    };
    return claims;
  } catch (e) {
    throw new CustomErr('NOAUTH', 'The provided token is not valid, login to get a new one', 'auth');
  }
}

export default authenticateUC;
