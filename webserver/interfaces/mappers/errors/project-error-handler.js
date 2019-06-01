/**
 * Sets the HTTP status code for a Custom Error and sends a user-friendly error message.
 */
function projectErrorHandler(err, req, res, next) {
  console.log(err.message);
  if (!err.code) return res.status(500).send();
  const { code, message, ...details } = err;
  console.log({ code, message, details });
  let status = 500;

  if (err.context === 'project') {
    // CODE     STATUS    DESCRIPTION 💩
    // NOTFOUND  404
    // NOTALLOW  401
  }

  if (err.context === 'validation') {
    return res.status(400).send(err);
  }

  return res.status(500).send();
}

export default projectErrorHandler;
