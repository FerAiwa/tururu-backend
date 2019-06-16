import { model } from 'mongoose';
import sprintSchema from './schemas/sprint-schema';

const Sprint = model('Sprint', sprintSchema, 'sprints');
export default Sprint;
