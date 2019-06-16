import { projectUC } from '../../../../../domain/use-cases/project';

/** Uploads project banner
 * @returns Location header
 */
async function uploadBanner(req, res, next) {
  const { file } = req;
  const { uuid } = req.claims;
  const { projectId } = req.params;

  try {
    if (!file || !file.buffer) {
      return res.status(400).send();
    }
    const location = await projectUC.uploadBanner(uuid, projectId, file);
    res.header('Location', location);

    return res.status(201).send();
  } catch (e) {
    return next(e);
  }
}

export default uploadBanner;
