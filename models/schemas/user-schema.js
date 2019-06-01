import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uuiV4 from 'uuidv4';

const userSchema = new Schema({
  uuid: { type: String, unique: true },
  name: String,
  email: String,
  password: String,
  createdAt: String,
  verificatedAt: { type: String, default: null },
  // Temp: Will be removed after verification proccess
  verificationCode: String,
  generatedAt: String,
  // Audit
  loginAttempts: { type: Number, default: 0 },
  unbanDate: { type: Date, default: null },
  // last_login: String,
  projects: [Schema.ObjectId],
});

userSchema.statics.findByEmail = async function (email) { // eslint-disable-line
  return this.findOne({ email });
};
userSchema.statics.findByVerificationCode = async function (verificationCode) { // eslint-disable-line
  return this.findOne({ verificationCode });
};

// METHODS
userSchema.methods.isValidPassword = async function (password) { // eslint-disable-line
  return bcrypt.compare(password, this.password);
};

userSchema.methods.activateAccount = async function () { // eslint-disable-line
  const updateQuery = {
    verificatedAt: new Date().toISOString(),
    $unset: { verificationCode: '', generatedAt: '' },
  };
  return this.model('User').findOneAndUpdate({ uuid: this.uuid }, updateQuery, { new: true });
};

userSchema.methods.resetVerificationCode = async function () { // eslint-disable-line
  const updateQuery = {
    verificated_at: null,
    verificationCode: uuiV4(),
    generatedAt: new Date(Date.now()).toISOString(),
  };
  return this.model('User').findOneAndUpdate({ uuid: this.uuid }, updateQuery, { new: true });
};

userSchema.methods.temporalBan = async function (time) { // eslint-disable-line
  return this.model('User').findOneAndUpdate({ uuid: this.uuid }, { unbanDate: time });
};

userSchema.methods.setLoginAttempts = async function (value) { // eslint-disable-line
  this.model('User').findOneAndUpdate({ uuid: this.uuid }, { $set: { loginAttempts: value } });
};

userSchema.methods.saveLoginAttempt = async function () { // eslint-disable-line
  return this.model('User').findOneAndUpdate({ uuid: this.uuid }, { $inc: { loginAttempts: 1 } });
};

export default userSchema;
