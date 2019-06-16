import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuidV4 from 'uuidv4';

import { loginRules } from '../../../models/validators/account-rules';
import accountRepository from '../../repositories/account-repository';
import validate from '../../entities/validation-entity';
import emailService from '../../email.service';
import { NotFoundErr } from '../../errors/customError';
import {
  BadPasswordErr,
  MaxAttemptsLoginErr,
  UserIsBannedErr,
  NotVerificatedLoginErr,
} from '../../errors/account-errors';

async function isValidPassword(password, storedPassword) {
  return bcrypt.compare(password, storedPassword);
}

/**
 * Provides a user token and extra payload if the user passes authentication.
 * @param {string} email
 * @param {string} password
 * @return { Promise<{ accessToken: string, uuid: string, email: string }> } token
 */
async function login(email, password) {
  await validate({ email, password }, loginRules);

  const user = await accountRepository.findUserByEmail(email);
  if (!user) {
    throw NotFoundErr('', 'user', 'login');
  }
  const { uuid } = user;

  // User can´t be banned
  if (user.unbanDate && Date.now() < user.unbanDate) {
    throw UserIsBannedErr(user.unbanDate);
  }

  // User must be verificated
  if (!user.verificatedAt) {
    const newCode = uuidV4();
    await accountRepository.resetVerificationCode(uuid, newCode);
    await emailService.sendEmailRegistration(user.email, newCode);

    throw NotVerificatedLoginErr();
  }

  // User must provide matching password
  if (!await isValidPassword(password, user.password)) {
    await accountRepository.updateLoginAttempts(uuid, user.loginAttempts + 1);
    const loginAttemptsLeft = 4 - user.loginAttempts;

    if (loginAttemptsLeft) {
      throw BadPasswordErr(loginAttemptsLeft);
    }
    // User must login before reaching max attempts
    const banMinutes = 60;
    const unbanDate = new Date(Date.now() + (banMinutes * 60 * 1000));

    await accountRepository.banUser(uuid, unbanDate);
    throw MaxAttemptsLoginErr(unbanDate);
  }

  // [👌] Give the user a 1h token & reset limiters (unban, login attempts)
  if (user.loginAttempts || user.unbanDate) {
    await accountRepository.resetUserLoginLimiters(uuid);
  }

  return {
    accessToken: jwt.sign({ uuid }, process.env.WEBTOKEN_SECRET, { expiresIn: '1h' }),
    email: user.email,
    uuid,
  };
}

export default login;
