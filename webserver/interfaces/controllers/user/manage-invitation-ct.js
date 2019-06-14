import manageInvitationUC from '../../../../domain/use-cases/user/manage-invitation-uc';

/**
 * Manage user answer to project invitation.
 * @param {Object} req
 */
async function manageProjectInvitation(req, res, next) {
  const { uuid } = req.claims;
  const { projectId, action } = req.query;
  try {
    await manageInvitationUC(uuid, projectId, action);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}
export default manageProjectInvitation;
