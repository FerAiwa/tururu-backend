import { Schema } from 'mongoose';
import sprintSchema from './sprint-schema';
import taskSchema from './task-schema';
import workSessionSchema from './worksession-schema';
import activeSessionSchema from './active-session-schema';
import projectInvitationSchema from './project-invitation-schema';


const projectSchema = new Schema({
  owner: String, // author, "master" can create admins
  admins: [String], // Can add users or create contents.
  users: [String], // ALL the users (including admins, owner)
  // Content
  name: String,
  bannerUrl: { type: String, default: null },
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
  activeSessions: [activeSessionSchema],
  invitations: [projectInvitationSchema],
});

export default projectSchema;
