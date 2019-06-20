import cloudinary from 'cloudinary';
import projectRepository from '../../../repositories/project-repository';
import permissionsEntity from '../../../entities/permissions-entity';
import validate from '../../../entities/validation-entity';
import { projectIdRule } from '../../../../models/validators/project-rules';

/**
 * Uploads the project banner image and adds the url to the Project instance.
 * @param {string} uuid user uuid
 * @param {string} projectId project id
 * @param {File} file image
 * @rules
 * - User must be owner of the project.
 */

async function uploadBannerUC(uuid, projectId, file) {
  await validate({ projectId }, projectIdRule);
  await permissionsEntity.checkAdminPermissions(uuid, projectId);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const bannerConfig = {
    public_id: projectId,
    resource_type: 'raw',
    width: 1200,
    height: 400,
    format: 'jpg',
    crop: 'limit',
  };

  try {
    cloudinary.v2.uploader
      .upload_stream(
        bannerConfig,
        async (err, result) => {
          if (err) throw err; // 401 err most likely
          const { secure_url: secureUrl } = result;

          await projectRepository.setProjectBanner(uuid, projectId, secureUrl);
          return secureUrl;
        }
      ).end(file.buffer);
  } catch (e) {
    throw (e);
  }
}

export default uploadBannerUC;
