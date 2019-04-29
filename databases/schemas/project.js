import { Schema, model } from 'mongoose';


const projectSchema = new Schema({
  name: String,
  categories: [String],
  author: String,
  admins: [String],
  // ALL the users (including admins, owner)
  users: [String],
  tasks: [Schema.ObjectId],
  reports: [Schema.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: Date,
  deadline: Date,
  finishedAt: Date,
  private: {
    type: Boolean,
    default: true,
  },
});

const Project = model('Project', projectSchema, 'projects');
export default Project;
