import { Schema } from 'mongoose';

const taskSchema = new Schema({
  author: String, // user uuid
  name: String,
  categories: [String],
  active: { type: Boolean },
  completed: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  deletedAt: Date,
  ellapsedTime: { type: Number, default: 0 },
});

export default taskSchema;
