import uuiV4 from 'uuidv4';
import CustomErr from '../../../models/customError';
import userRepository from '../../repositories/user-repository'; // using this as interface, the repo is inyected as dependency.

function getHourDiference(date1) {
  const hourDiff = (new Date() - new Date(+date1)) / (1000 * 60 * 60);
  return hourDiff;
}

function isVerificationCodeValid(generationDate) {
  return getHourDiference(generationDate) <= 24;
}

function getNewVerificationCode() {
  return {
    verificationCode: uuiV4(),
    verificated_at: null,
    generatedAt: new Date().toISOString(),
  };
}

function getAccountActivation() {
  return {
    verificationCode: '',
    verificatedAt: new Date().toISOString(),
    generatedAt: '',
  };
}

/** Consumes the verification code and activates user account.
 * @param {string} verificationCode
 */
async function activateAccount(verificationCode) {
  try {
    const user = await userRepository.findByVerificationCode(verificationCode);
    if (!user) throw new CustomErr('DELETED', 'The verification code you are trying to use no longer exists.');

    if (!isVerificationCodeValid(user.generatedAt)) {
      Object.assign(user, getNewVerificationCode());
      await userRepository.update(user);
      throw new CustomErr('OUTDAT', 'The verification code has expired. A new code was sent to your email.');
    }
    Object.assign(user, getAccountActivation());
    return user.save();
    // return userRepo.update(user);
  } catch (e) {
    e.context = 'activation';
    throw (e);
  }
}

export default activateAccount;
