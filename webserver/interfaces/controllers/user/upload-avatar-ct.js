import userUC from '../../../../domain/use-cases/user/index';

/** Uploads user´s avatar
 * @returns Location header
 */
async function uploadAvatar(req, res, next) {
  const { file } = req;
  const { uuid } = req.claims;

  try {
    if (!file || !file.buffer) {
      return res.status(400).send();
    }
    const location = await userUC.uploadAvatar(uuid, file, res);
    res.header('Location', location);
    return res.status(201).send();
  } catch (e) {
    return next(e);
  }
}

export default uploadAvatar;
