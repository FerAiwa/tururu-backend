import { GenericValidationErr, LapsedDateErr } from '../../../../domain/errors/validation-errors';

/**
 * Tranforms a Joi Error into the api convention Custom Err.
 */
function JoiErrorMapper(err, req, res, next) {
  if (err.isJoi) {
    console.log(err)
    const JoiErrType = err.details[0].type;

    if (JoiErrType === 'date.greater') {
      return next(LapsedDateErr());
    }
    return next(GenericValidationErr());
  }

  return next(err);
}

export default JoiErrorMapper;
