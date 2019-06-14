## Vie 14/06
  - Implemented EventEmitter & socket notification for project invitations.
    The event is fired at the inviteUser controlled.

## Jue 13/06
  - Added GET /users/search, with ct,uc and repo method.
  - Fixed bug in account creation. Email was sending uuid instead verification code.

## Ma 11/06
  - Projects now are initialized with a default sprint duration of 7 days.
  - Stats are now properly calculated at getProjectUC.
  - Changed the /user/projects endpoint for /user general get (userInfo & project base data, merged)
  - General refactor and minor bug fixes.

## Lu 10/06
  - Refactor of account ct,uc and repo to fit the architecture of the project.
  - Added validation entity and some rules.

## Dom 09/06
  - Implemented base socketIO for controlling the worksession flow.
    (Now other project members get notified in real time when a work session starts)

## Jue 06 to Sab 08
  - Minor fixes on repositories and documentation update.

## Mie 05/06
- Refactored some stats functions as stats-entity, for later reuse with user stats.
- Add GET /projects to user router.
- Add POST /banner to projects router.

## Ma 04/06
- Add stats projects into getProject use case.
- Refactor createProject controller, to connect with UC instead old service.
- Added sprint rules and joi validation for create & update.

## Lu 03/06
- Add endpoint to recover project users.
- Split the upload avatar functionality into controller & use case.

## Do 02/06
- Add upload user avatar
- Created router for /user
- Improved custom error messages.
- Add worksession repo
