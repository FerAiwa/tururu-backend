import { Schema, model } from 'mongoose';
import { sprintSchema } from './sprint';
import { taskSchema } from './task';
import { workSessionSchema } from './worksession';

const projectSchema = new Schema({
  uuid: String, // author, "master" can create admins
  admins: [String], // Can add users or create contents.
  users: [String], // ALL the users (including admins, owner)
  // Content
  name: String,
  categories: [String],
  tasks: [taskSchema], // What (pila de proyecto)
  workSessions: [workSessionSchema],
  sprints: [sprintSchema], // When (past) details stored in another collection
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  startAt: Date,
  deadline: Date,
  finishedAt: Date,
  isPrivate: { type: Boolean, default: true },
  // Markers
  activeSprint: Schema.ObjectId, // When (now) details
  activeTasks: [Schema.ObjectId], // Now now xD
});

const Project = model('Project', projectSchema, 'projects');
export default Project;
