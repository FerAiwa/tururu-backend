class CustomErr extends Error {
  constructor({ code, message, context = '' }) {
    super();
    this.code = code;
    this.message = message;
    this.context = context;
  }
}

function ProjectErr(code, message = null) {
  return new CustomErr({ code, message, context: 'project' });
}
function SprintErr(code, message = null) {
  return new CustomErr({ code, message, context: 'sprint' });
}

function PermissionErr(code) {
  if (code === 'NOTADMIN') {
    const message = 'Only project admins can edit project resources.';
    return new CustomErr({ code, message, context: 'edition' });
  }
  if (code === 'NOTOWNER') {
    const message = 'The requested action requires owner permissions.';
    return new CustomErr({ code, message, context: 'permissions' });
  }
  // notFound: ['NOTFOUND', 'The requested project doesn´t exist.'],
  // notAllow: ['NOTALLOW', 'This project is private, contact the project admin to gain access.'],
  // notAdmin: ['NOTADMIN', 'Only project admins can edit project resources.'],
}
function ActionNotAllowErr(message) {
  return new CustomErr({ code: 'FORBIDDEN', message });
}

function NotFoundErr(message, resourceType = 'project', context = null) {
  return new CustomErr({
    code: 'NOTFOUND',
    message: message || `The requested ${resourceType} doesn´t exist.`,
    context,
  });
}

export {
  ActionNotAllowErr,
  PermissionErr,
  ProjectErr,
  SprintErr,
  NotFoundErr,
  CustomErr,
};
