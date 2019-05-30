## Promote User
## Description
Owner action that gives the target user admin privileges.
Admins can perform all CRUD operations on any project
resource.

## PATH
1. Verify that the request comes from project owner.
2. Check if the target user exist.
3. Add the user to project admins-list.

### Unhappy Paths
· 401. User is not project owner
· 404. User doesn´t exist.
