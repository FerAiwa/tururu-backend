import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  uuid: String,
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
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

const User = model('User', userSchema, 'users');
export default User;
