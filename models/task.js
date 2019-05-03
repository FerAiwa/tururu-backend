import { Schema, model } from 'mongoose';
// import { workSessionSchema } from './worksession';

export const taskSchema = new Schema({
  uuid: { type: String, unique: true }, // author (added to project by)
  name: String,
  categories: [String],
  active: { type: Boolean },
  completed: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  ellapsedTime: { type: Number, default: 0 }, // $inc en cada worksession.
  // workSessions: [workSessionSchema],
});

const Task = model('Task', taskSchema);
export default Task;
