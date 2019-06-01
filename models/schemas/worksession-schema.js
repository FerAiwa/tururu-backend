import { Schema } from 'mongoose';

const workSessionSchema = new Schema({
  uuid: String, // user uuid = worker, creator.
  taskId: String,
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
  ellapsedTime: Number,
});

export default workSessionSchema;
