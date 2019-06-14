/**
 * Sets the HTTP status code for a Custom Error and sends a user-friendly error message.
 */
function projectErrorHandler(err, req, res, next) {
  console.log(err);
  if (!err.code) return res.status(500).send();
  const { code, message, context } = err;
  console.log({ code, message, context });
  let status = 500;

  if (code === 'NOTFOUND') res.status(404).send();

  if (err.context === 'authentication') {
    return res.status(401).send(err);
  }

  if (context === 'project') {
    // CODE     STATUS    DESCRIPTION 💩
    // NOTFOUND  404
    // NOTALLOW  401
  }

  if (context === 'validation') {
    return res.status(400).send(err);
  }
  if (context === 'permissions') {
    return res.status(403).send(err);
  }

  if (context === 'forbidden') {
    // App actions that are not allowed, such as owner deletying himself from a project.
    return res.status(412).send(err);
  }

  return res.status(500).send();
}

export default projectErrorHandler;
