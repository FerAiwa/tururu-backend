import uuiV4 from 'uuidv4';
import { User, Project } from '../models';


// UTILS _________________________________________________________________
// const hashpassword = (password) => bcrypt.hash(password, 10);
// Replaces the first T, to be properly stored in SQL date format (UTC)
const getNormalizedNowDate = () => new Date().toISOString().substring(0, 19).replace('T', ' ');

function getHourDiference(date1) {
  const date = date1.replace(' ', 'T').concat('Z');
  const hourDiff = (new Date() - new Date(date)) / (1000 * 60 * 60);
  return hourDiff;
}
/**
 * @returns {Boolean}
 */
function isVerificationCodeValid(generationDate) {
  return getHourDiference(generationDate) <= 24;
}

/** Insert a new user in the database
* @returns {String} User uuid
*/
async function saveNewUser(user) {
  const newUser = await User.create(user);
  console.log('Inserted user', newUser);
  return newUser.uuid;
}

/**
 *  @returns {Promise} Verification code
*/
async function getUserByVerificationCode(verificationCode) {
  return User.findOne({ verificationCode });
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

/**
 * @returns {Promise<{}>} User
 * */
async function activateUserAccount(uuid) {
  const updateQuery = {
    verificatedAt: getNormalizedNowDate(),
    $unset: { verificationCode: '', generatedAt: '' },
  };
  return User.findOneAndUpdate({ uuid }, updateQuery, { new: true });
}


/**
 * @returns {String} New verification code
 */
async function resetVerificationCode(userId) {
  const updateQuery = {
    verificated_at: null,
    verificationCode: uuiV4(),
    generatedAt: getNormalizedNowDate(),
  };
  const user = await User.findByIdAndUpdate(userId, updateQuery, { new: true });
  return user.verificationCode;
}

// USER PROJECTS ___________________________________________________________________________
async function getUserProjects(uuid) {
  return Project.find({ users: uuid });
}
// Shouldnt this be in USER?? is another domain...
async function addProjectIdToUser(uuid, projectId) {
  return User.findOneAndUpdate({ uuid }, { $push: { projects: projectId } });
}


// SECURITY ___________________________________________________________________________
async function saveLoginAttempts(uuid) {
  await User.findOneAndUpdate({ uuid }, { $inc: { loginAttempts: 1 } });
}

async function resetLoginAttempts(uuid) {
  await User.findOneAndUpdate({ uuid }, { $set: { loginAttempts: 0 } });
}

async function tempBanUserLogin(uuid, time) {
  await User.findOneAndUpdate({ uuid }, { loginBlockTime: time });
}

export default {
  addProjectIdToUser,
  activateUserAccount,
  getUserProjects,
  getUserByVerificationCode,
  getUserByEmail,
  isVerificationCodeValid,
  resetVerificationCode,
  resetLoginAttempts,
  saveLoginAttempts,
  saveNewUser,
  tempBanUserLogin,
};
