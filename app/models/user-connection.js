import { model } from 'mongoose';
import userConnectionSchema from './schemas/connection-schema';

const UserConnection = model('Connection', userConnectionSchema, 'connections');

export default UserConnection;
