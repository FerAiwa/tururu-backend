import Mongoose from 'mongoose';

export const verificationSchema = new Mongoose.Schema({
  user_uuid: String,
  verification_code: String,
  created_at: String
})

const Verification = Mongoose.model('Verification', verificationSchema, 'users_activation');
