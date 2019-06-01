import User from '../../models/user';

/**
 * Finds a user by uuid
 * @param {string} uuid
 * @returns {User}
 */
async function findByUuid(uuid) {
  return User.findOne({ uuid });
}

/**
 * Finds a user by email
 * @param {*} email
 * @returns {User}
 */
async function findByEmail(email) {
  User.findOne({ email });
}

/**
 * Finds a user by verification code
 * @param {string} verificationCode
 * @returns {Promise<User>}
 */
async function findByVerificationCode(verificationCode) {
  return User.findOne({ verificationCode });
}

/**
 * Update a user
 * @param {*} user
 */
async function update(user) {
  const result = await User.updateOne(user);
  return result;
}

// TODO: Separar qué puedo hacer desde el propio modelo en los use Cases. Dejar aquí CRUD + asserts

async function temporalBan(time) {
  return User.findOneAndUpdate({ uuid: this.uuid }, { unbanDate: time });
}

async function setLoginAttempts(value) {
  return User.findOneAndUpdate({ uuid: this.uuid }, { $set: { loginAttempts: value } });
}

async function saveLoginAttempt() {
  return User.findOneAndUpdate({ uuid: this.uuid }, { $inc: { loginAttempts: 1 } });
}

export default {
  findByEmail,
  findByUuid,
  findByVerificationCode,
  saveLoginAttempt,
  setLoginAttempts,
  temporalBan,
  update,
};
