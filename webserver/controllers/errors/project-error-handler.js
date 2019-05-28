
function projectErrorHandler(err, req, res, next) {
  console.log(err.message);
  if (!err.code) return res.status(500).send();
  const { code, message, ...details } = err;
  console.log({ code, message, details });
  let status = 500;

  if (err.context === 'getProject') {
    // CODE     STATUS    DESCRIPTION 💩
    // NOTFOUND  404      
    // NOTALLOW  401      
  }


  // Untracked custom error... save!
  return res.status(500).send();
}

export default projectErrorHandler;
