import Mongoose from 'mongoose';

export const userSchema = new Mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  created_at: String,
  verificated_at: String
})

const User = Mongoose.model('User', userSchema, 'users');
