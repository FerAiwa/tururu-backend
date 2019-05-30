import { model } from 'mongoose';
import ProjectSchema from './schemas/project-schema';

/**
 * @class ProjectSchema
 */
const Project = model('Project', ProjectSchema, 'projects');
export default Project;
