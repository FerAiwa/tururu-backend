
import authenticateUC from '../../domain/use-cases/account/authenticate-uc';

/**
 * Middleware that prevents unauthorized users to pass protected routes
 * by checking if the jsonWebtoken (req.headers.authorization) is valid.
 */
async function checkWebtoken(req, res, next) {
  try {
    const authorization = req.headers && req.headers.authorization;
    // authorization header comes in format "bearer tokenString". Split the bearer to get the token.
    const token = authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1];

    const claims = await authenticateUC(token);
    // [👌] token is valid. User can continue to a protected route
    req.claims = claims;
    return next();
  } catch (e) {
    return next(e);
  }
}

export default checkWebtoken;
