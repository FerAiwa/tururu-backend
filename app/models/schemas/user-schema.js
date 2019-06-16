import { Schema } from 'mongoose';
import projectInvitationSchema from './project-invitation-schema';


const userSchema = new Schema({
  uuid: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: Date,
  verificatedAt: { type: Date, default: null },
  // Temp: Will be removed after verification proccess
  verificationCode: String,
  generatedAt: Date,
  // Audit
  loginAttempts: { type: Number, default: 0 },
  unbanDate: { type: Date, default: null },
  // last_login: String,
  projects: [Schema.ObjectId],
  avatarUrl: { type: String, default: null },
  invitations: [projectInvitationSchema],
});

userSchema.index({
  name: 'text',
});

export default userSchema;
