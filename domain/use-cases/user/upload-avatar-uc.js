import cloudinary from 'cloudinary';
import accountRepository from '../../repositories/account-repository';

/**
 * Uploads the avatar in Cloudinary, and stores its url in the user´s account.
 * @param {string} uuid
 * @param {File} file
 * @returns {string} avatar url
 */
async function uploadAvatarUC(uuid, file) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const avatarConfig = {
    public_id: uuid,
    resource_type: 'image',
    width: 200,
    height: 200,
    format: 'jpg',
    crop: 'fill',
    gravity: 'faces',
    invalidate: true, // to force update on a already fetched image after a short period of time
  };

  try {
    cloudinary.v2.uploader
      .upload_stream(
        avatarConfig,
        async (err, result) => {
          if (err) throw err; // 400 err most likely
          const { secure_url: secureUrl } = result;
          // Store avatar URL in the user´s account.
          const isUserUpdated = await accountRepository
            .setUserAvatar(uuid, secureUrl);

          if (!isUserUpdated) return Error('Db update failed'); // 500
          return secureUrl;
        }
      ).end(file.buffer);
  } catch (e) {
    throw (e);
  }
}

export default uploadAvatarUC;
