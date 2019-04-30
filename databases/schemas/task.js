import Mongoose from 'mongoose';

const { Schema } = Mongoose;

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

export const Task = Mongoose.model('Task', taskSchema);
