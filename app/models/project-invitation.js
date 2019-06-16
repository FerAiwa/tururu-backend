import { model } from 'mongoose';
import projectInvitationSchema from './schemas/project-invitation-schema';

const ProjectInvitation = model('ProjectInvitation', projectInvitationSchema);
export default ProjectInvitation;
