# Tururu Backend
This is the backend for Tururú App, a task manager with cooperative options, time tracking and stadistics.

Right now this is a MVP with basic functionality, a personal project made for Hack a Bos Full-Stack Bootcamp
which main purpose is to show the skills adquired along the course.

The open beta version of the app can be found [here](https://feraiwa.github.io/tururu)

# Tech Details
* This is an API Rest & Sockets webserver.
* Main Techs: NodeJS, Express, MongoDB & SocketIO.

* The code is structured trying to follow Single Responsibility Principle (SRP) and
some of the suggestions made by Clean Architecture.

The main structure is divided in: 
- Interfaces: Controllers | Presenters. _(Receive input, data mapping and output)._
- Domain: Use Cases and Entities. _(For business logic, including validation.)_
- Repositories. _(The data access.)_
- Models: Schemas, Models & validation rules.


## First public release v1.0 (June 2016)

## Implemented features, usable in the app:
* Creacion of accounts, projects, tasks and work sessions.
* Assigment of tasks.
* Project invitation system using sockets.
* Project permission system. Owner > Admins > User _(*needs revision)_
* Socket notifications.


### Things I will improve for the next release:
* Fix the more complex analytics recovered after project load.
* Better flow of the work session end. Stop after disconection.
* Refactor of the socket implementation.
* Debounce of the socket reconnections.
* Review the permission system.
* Allow more kind of notifications _(right now notification = invitation)_

### Things I would like to improve in upcoming months:
* Learn REDDIS basics and use it to store the socket connections, instead MongoDB.
* Learn and implement refresh token.
* Implement events for week end, project accomplish.
* Implement events for user and team rewards based on weekly activity.
