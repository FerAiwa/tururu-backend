import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  created_at: String,
  verificated_at: { type: String, default: null },
  //Temp: Will be removed after verification proccess
  verification_code: String,
  generated_at: String,
  //Audit
  login_attempts: { type: Number, default: 0 },
  login_block_time: { type: String, default: '' },
  //last_login: String,
})

export const User = Mongoose.model('User', userSchema, 'users');
