import { Schema } from 'mongoose';

const sprintSchema = new Schema({
  tasks: [Schema.ObjectId], // tasks can be reasigned, registering here to track change.
  reward: String,
  startsAt: Date,
  endsAt: Date,
});


export default sprintSchema;
