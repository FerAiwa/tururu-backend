'use strict';
import uuiV4 from 'uuidv4';
import { accountModels } from './schemas';

//UTILS _________________________________________________________________
const hashpassword = (password) => bcrypt.hash(password, 10);

//Replaces the first T, to be properly stored in SQL date format (UTC)
const getNormalizedNowDate = () => new Date().toISOString().substring(0, 19).replace('T', ' ');

function getHourDiference(date1) {
  const date = date1.replace(" ", "T") + "Z";
  const hourDiff = (new Date() - new Date(date)) / (1000 * 60 * 60)
  return hourDiff
}

async function insertNewUser(user) {
  const newUser = new accountModels.User(user);
  await newUser.save();
  console.log('Inserted user', newUser)
  return newUser._id
}

async function getUserByVerificationCode(verification_code) {
  return await accountModels.User.findOne({ verification_code });
}
async function getUserByEmail(email) {
  const user = await accountModels.User.findOne({ email });
  return user;
}


async function activateAccount(userId) {
  const updateQuery = {
    verificated_at: getNormalizedNowDate(),
    $unset: { verification_code: "", generated_at: "" }
  }
  return await accountModels.User.findByIdAndUpdate(userId, updateQuery, { new: true })
}

//Check unhappy path: +24h since validation code creation || not found
async function isVerificationCodeValid(generationDate) {
  return getHourDiference(generationDate) <= 24
}

async function resetVerificationCode(userId) {
  const updateQuery = {
    verificated_at: null,
    verification_code: uuiV4(),
    generated_at: getNormalizedNowDate()
  };
  const user = await accountModels.User.findByIdAndUpdate(userId, updateQuery, { new: true });
  return user.verification_code
}

async function saveLoginAttempts(email) {
  await accountModels.User.findOneAndUpdate({ email }, { $inc: { login_attempts: 1 } });
}

async function tempBanUserLogin(email, time) {
  await accountModels.User.findOneAndUpdate({ email }, { login_block_time: time })
}

export const accountService = {
  activateAccount,
  getUserByVerificationCode,
  getUserByEmail,
  insertNewUser,
  isVerificationCodeValid,
  resetVerificationCode,
  saveLoginAttempts,
  tempBanUserLogin,
}