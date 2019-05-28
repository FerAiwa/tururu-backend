import bcrypt from 'bcrypt';
import uuiV4 from 'uuidv4';
import { User } from '../../../models';
import emailService from '../../email.service';

async function generateUser({ name, password, email }) {
  return {
    uuid: uuiV4(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
    verificationCode: uuiV4(),
    generatedAt: Date.now(),
  };
}

/**
 * Creates and stores a new account
 * @param {*} userData 
 */
async function createAccount(userData) {
  try {
    const user = await generateUser(userData);
    await User.create(user);
    await emailService.sendEmailRegistration(user.email, user.uuid);
  } catch (e) {
    e.context = 'creation';
    throw (e);
  }
}

export default createAccount;
