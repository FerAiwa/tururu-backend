
import Joi from 'joi';
/**
 * Validation middleware for user registration. 
 * 
 * req.body must include a name, valid e-mail domain and a password between 3-30 
 * numbers/letters.
 */

export default async function validateFormSchema(req, res, next) {
  console.log(req.body)
  const schema = {
    name: Joi.string(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  };
  try {
    await Joi.validate(req.body, schema)
  }
  catch (e) {
    console.log('Invalid data in req.body')
    return res.status(400).send()
  }
  console.log('1. Validated Input schema via middleware')
  next()
}
