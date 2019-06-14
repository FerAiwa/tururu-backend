import { model } from 'mongoose';
import activeSessionSchema from './schemas/active-session-schema';

const ActiveSession = model('ActiveSession', activeSessionSchema);

export default ActiveSession;
