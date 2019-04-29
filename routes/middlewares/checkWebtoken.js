import jwt from 'jsonwebtoken';

/**
 * Middleware that prevents unauthorized users to pass protected routes
 * by checking if the jsonWebtoken (req.headers.authorization) is valid.
 */
async function checkWebtoken(req, res, next) {
  const secret = process.env.WEBTOKEN_SECRET;
  const { headers: { authorization } } = req;
  try {
    // authorization header comes in format "bearer tokenString". Split the bearer to get the token.
    const token = authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    // Set req.claims to share user uuid with other middlewares
    req.claims = {
      uuid: decoded.uuid,
    };
    // [👌] token is valid. User can continue to a protected route
    next();
  } catch (e) {
    // [💩#1] Webtoken is wrong or expired
    return res.status(401).send('You shall not pass!!');
  }
}

export default checkWebtoken;
