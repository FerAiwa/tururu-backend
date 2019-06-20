import bcrypt from 'bcrypt';
import uuiV4 from 'uuidv4';
import emailService from '../../email.service';
import { EmailInUseErr } from '../../errors/account-errors';
import accountRepository from '../../repositories/account-repository';
import { registerRules } from '../../../models/validators/account-rules';
import validate from '../../entities/validation-entity';

/** Generates additional fields for the userData before sending to repository */
async function generateUser({ name, password, email }) {
  return {
    uuid: uuiV4(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
    verificationCode: uuiV4(),
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Creates a new account and sends a verification e-mail to the user
 * @param {Object} userData { name, email, password }
 * @rules
 * - e-mail must be unique.
 */
async function createAccount({ name, email, password }) {
  const registerData = { name, email, password };
  await validate(registerData, registerRules);

  const userData = await generateUser(registerData);

  try {
    await accountRepository.createUser(userData);
  } catch (e) {
    if (e.message.includes(email)) throw EmailInUseErr();
    throw (e);
  }

  await emailService.sendEmailRegistration(email, userData.verificationCode);
}

export default createAccount;
