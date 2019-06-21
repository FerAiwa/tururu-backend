import userUC from '../../../../domain/use-cases/user';
/**
 * Makes a full-text search on user names
 */
async function searchUsers(req, res, next) {
  const { q } = req.query;
  console.log('searching user' , q);

  try {
    const usersPublicInfo = await userUC.searchUsersUC(q);
    return res.send(usersPublicInfo);
  } catch (e) {
    return next(e);
  }
}

export default searchUsers;
