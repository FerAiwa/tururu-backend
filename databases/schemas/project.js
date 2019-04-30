import { Schema, model } from 'mongoose';
import { sprintSchema } from './sprint';

const taskSchema = new Schema({
  uuid: { type: String, unique: true }, // author (added to project by)
  name: String,
  categories: [String],
  createdAt: { type: Date, default: Date.now },
  startedAt: Date,
  completedAt: Date,
  ellapsedTime: Number,
  lastSprint: Schema.ObjectId, // Cuando se hace reasignación de pila a sprint, se updatea
});

const projectSchema = new Schema({
  uuid: { type: String, unique: true }, // author, "master" can create admins
  name: String,
  categories: [String],
  admins: [{ type: String, unique: true }], // Can add users or create contents.
  users: [{ type: String, unique: true }], // Who // ALL the users (including admins, owner)

  tasks: [taskSchema], // What (pila de proyecto)
  currentSprint: [sprintSchema], // When (now) details
  // sprints: [Schema.ObjectId], //When (past) details stored in another collection
  createdAt: { type: Date, default: Date.now },
  startedAt: Date,
  deadline: Date,
  finishedAt: Date,
  private: { type: Boolean, default: true },
  // Log de ediciones? Creacion/Delete/eventos
});

const Project = model('Project', projectSchema, 'projects');
export default Project;
