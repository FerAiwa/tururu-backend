import uuiV4 from 'uuidv4';
import { verificationRules } from '../../../models/validators/account-rules';
import accountRepository from '../../repositories/account-repository';
import validate from '../../entities/validation-entity';


import { DeletedCodeErr, ExpiredCodeErr } from '../../errors/account-errors';

function getHourDiference(stringDate) {
  const date = new Date(stringDate).getTime();
  const hourDiff = (Date.now() - date) / (1000 * 60 * 60);
  return hourDiff;
}

/** Consumes the verification code and activates user account.
 * @param {string} verificationCode
 * @rules
 * - Verification code must be used within the first 24 hours after generation.
 * - Verification code must exist.
 */
async function activateAccount(verificationCode) {
  await validate({ verificationCode }, verificationRules);

  const user = await accountRepository.findUserByVerificationCode(verificationCode);
  if (!user) throw DeletedCodeErr();

  const isCodeInTime = getHourDiference(user.generatedAt) <= 24;
  if (!isCodeInTime) {
    const newCode = uuiV4();
    await accountRepository.resetVerificationCode(user.uuid, newCode);

    throw ExpiredCodeErr();
  }

  return accountRepository.setAcountAsVerificated(user.uuid);
}

export default activateAccount;
