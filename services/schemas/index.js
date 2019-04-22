import { userSchema } from './user';
import { verificationSchema } from './verification-code';

export const accountSchemas = {
  user: userSchema,
  verification: verificationSchema,
}

