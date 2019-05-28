/**
* Cors Middleware (Allow frontend app served in other port, to access api)
*/
function corsHeaders(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-market');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
}

export default corsHeaders;
