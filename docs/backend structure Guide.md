## BACKEND STRUCTURE GUIDE
- Last update: 29/05/2019

## Information Flow
The user requests are processed vía API REST.
Uses express error handling.

router -> controller -> domain Use Case -> repository

· Routers: (-rt)
  · Contain API endpoints for a specific route.
  · Connects routes with controllers using Express middleware.
  · Each router also connects with a custom error mapper.

· Controllers/Presenters: (-ct)
    · Filter desired data from the http requests.
    · Call the required use case.
    · Return the response if the use case followed the happy path.
    · Passes the custom error to the error mapper otherwise.

· Use Cases (-uc):
    · Applies the business logic.
    · Interacts with repositories to recover or change stored data.
    · Outputs data or a custom error*

· Repository (-repo):
    · Provides multiple methods to access or transform stored data.

· Mappers: 
    · Map custom errors origined in a UC unhappy path, into http errors.


|- domain
   |-errors
   |-repositories
   |-use-cases

|- webserver
   |-interfaces
   |---controllers
   |---mappers
   |-----errors
   |-middlewares
   |-routes
