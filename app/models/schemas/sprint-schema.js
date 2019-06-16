import { Schema } from 'mongoose';

const sprintSchema = new Schema({
  tasks: [Schema.ObjectId], // tasks can be reasigned, registering here to track change.
  startAt: Date,
  endAt: Date,
  reward: String,
});


export default sprintSchema;
