import { Schema } from 'mongoose';
import { sprintSchema } from '../sprint';
import { taskSchema } from '../task';
import { workSessionSchema } from '../worksession';

/**
 * @class Project
 * @mixes {projectSchema.methods}
 */
const projectSchema = new Schema({
  owner: String, // author, "master" can create admins
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


projectSchema.method.isUserAdmin = uuid => this.admins.includes(uuid);
projectSchema.method.userCanRead = (uuid) => {
  if (this.isPrivate) return this.users.includes(uuid);
  return true;
};


export default projectSchema;
