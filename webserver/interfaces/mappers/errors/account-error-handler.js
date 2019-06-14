
function accountErrorHandler(err, req, res, next) {
  console.log(err);
  if (!err.code) return res.status(500).send();
  const { code, message, ...details } = err;
  console.log({ code, message, details });
  let status = 500;

  if (err.context === 'authentication') {
    return res.status(401).send(err);
  }

  if (err.context === 'validation') {
    return res.status(400).send(err);
  }

  if (err.context === 'register') {
    if (code === 'EMAIL') status = 401;
    return res.status(status).send(err);
  }

  if (err.context === 'login') {
    // CODE     STATUS    DESCRIPTION 💩
    // USERBAN  401       User is banned
    // NOCODE   401       User tried to login before using activation code
    // BADPWD   401       User forgot password. TODO - Offer a forgot/reset password link!
    // NOUSER   404       User doesn´t exist.
    // MAXPWD   429       Repeated login attempts. Is user trying brute force?
    if (code === 'NOUSER') status = 404;
    else if (code === 'MAXPWD') status = 429;
    else status = 401;
    return res.status(status).send(err);
  }

  if (err.context === 'activation') {
    if (code === 'EXPIRED') status = 400;
    else if (code === 'DELETED') status = 404;

    return res.status(status).send(err);
  }
  // Untracked custom error... save!
  return res.status(500).send();
}

export default accountErrorHandler;
