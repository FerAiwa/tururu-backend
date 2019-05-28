import { Schema, model } from 'mongoose';

export const workSessionSchema = new Schema({
  uuid: String, // user uuid = worker, creator.
  taskId: String,
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
  ellapsedTime: Number,
});

const WorkSession = model('WorkSession', workSessionSchema);
export default WorkSession;
