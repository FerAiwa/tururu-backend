
import authenticateUC from '../../domain/use-cases/account/authenticate-uc';

/**
 * Middleware that prevents unauthorized users to connect socket if the user is not authenticated
 */
function socketAuth(socket, next) {
  try {
    // console.log(socket.handshake);
    const authorization = socket.handshake.headers
      && socket.handshake.headers.authorization;

    const token = authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1];

    const claims = authenticateUC(token);
    // [👌] token is valid. User can continue to a protected route
    // eslint-disable-next-line no-param-reassign
    socket.claims = claims;
    next();
  } catch (e) {
    console.log('Auth failed');
    // Error sent to socket error handler
    next(e);
  }
}

export default socketAuth;
