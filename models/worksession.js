import { Schema, model } from 'mongoose';

export const workSessionSchema = new Schema({
  uuid: { type: String, unique: true }, // user uuid = worker, creator.
  taskId: { type: String, unique: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
  // ellapsedTime: Number,
});

const WorkSession = model('WorkSession', workSessionSchema);
export default WorkSession;
