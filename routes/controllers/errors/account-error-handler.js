
function accountErrorHandler(err, req, res, next) {
  console.log('acc err handler', err.message)
  if (!err.source) return res.status(500).send();
  // ERROR LIST
  // SOURCE: LOGIN CONTROLLER

  // CODE     STATUS    DESCRIPTION 💩
  // USERBAN  401       User is banned
  // NOCODE   401       User tried to login before using activation code
  // MAXPWD   429       Repeated login attempts. Is user trying brute force?
  // BADPWD   401       User forgot password. TODO - Offer a forgot/reset password link!
  if (err.source === 'login') {
    const status = err.code !== 'MAXPWD' ? 401 : 429;
    return res.status(status).send({ error: err.message });
  }
}

export default accountErrorHandler;
