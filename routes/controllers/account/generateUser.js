import bcrypt from 'bcrypt';
import uuiV4 from 'uuidv4';

//UTILS ___________________________________________________________
const hashpassword = (password) => bcrypt.hash(password, 10);
//Replaces the first T, to be properly stored in SQL date format (UTC)
const getNormalizedNowDate = () => new Date().toISOString().substring(0, 19).replace('T', ' ');

/** Given a name, password and email.
 * Adds to the user object a uuid, hashed password and a creation date Z ready to be inserted in the db.
 */
export default async function generateUser({ name, password, email }) {
  return {
    _id: uuiV4(),
    name,
    email,
    password: await hashpassword(password),
    created_at: getNormalizedNowDate()
  }
}
