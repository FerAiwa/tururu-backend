import { Schema } from 'mongoose';

/**
 * Task id with extended info about the user that started the work session.
 *
 * While a worksession is a permanent register, this life cycle is short.
 * Model instances are deleted right after session ends.
 *
 * Its single purpose is to have direct access to the task id and the
 * user visual info in one query, as this is the part of the project flow that
 * will have more traffic.
 */
const activeSessionSchema = new Schema({
  taskId: Schema.ObjectId,
  startedAt: { type: Date, default: Date.now() },
  uuid: String, // one user can make only 1 task at a  time!
  name: String,
  avatarUrl: { type: String, default: null },
});

export default activeSessionSchema;
