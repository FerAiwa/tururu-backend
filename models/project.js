import { Schema, model } from 'mongoose';
import { sprintSchema } from './sprint';
import { taskSchema } from './task';
import { workSessionSchema } from './worksession';


const projectSchema = new Schema({
  uuid: { type: String, unique: true }, // author, "master" can create admins
  admins: [{ type: String, unique: true }], // Can add users or create contents.
  users: [{ type: String, unique: true }], // ALL the users (including admins, owner)
  // Content
  name: String,
  categories: [String],
  tasks: [taskSchema], // What (pila de proyecto)
  workSessions: [workSessionSchema],
  sprints: [sprintSchema], // When (past) details stored in another collection
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  startedAt: Date,
  deadline: Date,
  finishedAt: Date,
  private: { type: Boolean, default: true },
  // Markers
  activeSprint: Schema.ObjectId, // When (now) details
  activeTasks: [Schema.ObjectId], // Now now xD
});

const Project = model('Project', projectSchema, 'projects');
export default Project;
