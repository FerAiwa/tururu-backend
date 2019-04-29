import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const projectSchema = new Schema({
  uuid: { type: String, unique: true }, // author
  name: String,
  categories: [String],
  admins: [{ type: String, unique: true }],
  // ALL the users (including admins, owner)
  users: [{ type: String, unique: true }],
  tasks: [Schema.ObjectId],
  // reports: [Schema.ObjectId],
  created_at: { type: Date, default: Date.now },
  started_at: Date,
  deadline: Date,s
  finished_at: Date,
  private: { type: Boolean, default: true },
});

const taskSchema = new Schema({
  // author (added to project by)
  uuid: { type: String, unique: true },
  name: String,
  categories: [String],
  createdAt: { type: Date, default: Date.now },
  startedAt: Date, // o worksessions[0]
  completedAt: Date,
  ellapsedTime: Number,
  workSessions: [{ type: Schema.types.ObjectId }]
});

// al hacer el POST para el startAt, devuelve el _id;
// al pausar en front, PUT con ese _id, uuid, ended_at
const workSessionSchema = new Schema({
  // worker
  uuid: { type: String, unique: true },
  // task: [Schema.ObjectId],
  startedAt: { type: Date, default: Date.now },
  ended_at: Date,
}); // 1 worksession, 1 user...

// Creo que esto no me hace falta...
/* const reportSchema = new Schema({
  uuid: { type: String, unique: true },
  date: Date,
  workSessions: [Schema.ObjectId],
  // Quizz vars ?
});
*/

export const Task = Mongoose.model('Task', taskSchema, 'tasks');
