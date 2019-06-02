import { CustomErr } from './customError';

function GenericValidationErr() {
  return new CustomErr({
    code: 'INVALID_DATA',
    message: 'Invalid data.',
    context: 'validation',
  });
}

function LapsedDateErr() {
  return new CustomErr({
    code: 'LAPSED_DATE',
    message: 'Make sure start & ending dates are equal or greater than today...!',
    context: 'validation',
  });
}

export {
  GenericValidationErr,
  LapsedDateErr,
};
