import jwt from 'jsonwebtoken';

/**
* Middleware that prevents unauthorized users to pass protected routes
* by checking if the jsonWebtoken (req.headers.authorization) is valid.
 */
export default async function checkWebtoken(req, res, next) {
  const { headers } = req;
  try {
    //auth comes in format "Bearer tokenString". Split the bearer to get the token.
    const token = headers.authorization && headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.WEBTOKEN_SECRET);
    next()   //[👌] token is valid, continue to the protected route
  }
  catch (e) {
    //[💩#1] Webtoken is wrong or expired
    return res.status(403).send('You shall not pass!!')
  }
}