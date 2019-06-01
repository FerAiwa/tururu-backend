import { model } from 'mongoose';
import taskSchema from './schemas/task-schema';

const Task = model('Task', taskSchema);

export default Task;
