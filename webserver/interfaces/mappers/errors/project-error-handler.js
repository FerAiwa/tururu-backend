/**
 * Sets the HTTP status code for a Custom Error and sends a user-friendly error message.
 */
function projectErrorHandler(err, req, res, next) {
  console.log(err.message);
  if (!err.code) return res.status(500).send();
  const { code, message, context } = err;
  console.log({ code, message, context });
  let status = 500;

  if (context === 'project') {
    // CODE     STATUS    DESCRIPTION 💩
    // NOTFOUND  404
    // NOTALLOW  401
  }

  if (context === 'validation') {
    return res.status(400).send(err);
  }
  if (context === 'permissions') {
    return res.status(401).send(err);
  }

  if (context === 'forbidden') {
    return res.status(403).send(err);
  }

  return res.status(500).send();
}

export default projectErrorHandler;