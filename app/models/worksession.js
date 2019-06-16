import { model } from 'mongoose';
import workSessionSchema from './schemas/worksession-schema';

const WorkSession = model('WorkSession', workSessionSchema);

export default WorkSession;
