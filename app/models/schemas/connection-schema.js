import { Schema } from 'mongoose';

const userConnectionSchema = new Schema({
  uuid: { type: String, unique: true },
  socketId: { type: String, unique: true },
});

export default userConnectionSchema;
