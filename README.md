# Sterlin
Mock Premier League API for fetching and managing seasons, teams, and fixtures.

[Documentation](https://documenter.getpostman.com/view/8137561/SVSHtVvn)
[Live API](https://strlin.herokuapp.com/)

## Setup
To setup for development please follow the steps bellow.

1. Clone the repo with `git clone https://github.com/thecodecafe/sterlin.git --branch dev` Ensure you clone **dev** branch as this is the active development branch, the master branch only contains production ready code.
2. Now that you have the repo cloned to your machine, simply cd into the directory with `cd sterlin` and run `npm install` to install all the required dependencies.
3. Next setup environment variables by creating a copy of the .env.example file. copy it's content and create a new file named `.env` and dump the code there, then adjust the values for the environment variable accordingly.
4. Finally run `npm run dev` to start the node server and navigate to `http://localhost:3000` (This is assuming the app port in the .env you created is 3000 otherewise it will be localhost and your preffered port) to view the project on your browser.

## NPM Scripts
1. `npm start` This is used to start the node server in production.
2. `npm test` This will run the test suites setup within the project.
3. `npm run dev` This should be used in development within your machine to start the node server, nodemon is used to restart server when files change.
4. `npm run docker:build` This will build the docker image for the project which you can use to setup a docker container on your machine, this is assuming you have docker installed already.
5. `npm run docker:run` This will run a docker container from the docker image already setup with the `npm run docker:build` command, when ran successfully, the docker container can be access from your browser by going to the address `http://localhost:3000`.

## Environment
As mentioned in the setup section, you can setup your environment variables using the `.env`, the required variables can be found within the `.env.example` file, please find below more details on each variable.

 1. **APP_URL** This should be a full url that can be used to acces the API when it is running.
 2. **APP_PORT** Although overwritten by the environments (machine level) PORT variable, this specifies the port the API will run when it is started.
 3. **APP_DEBUG** Although partially implemented, this is used to determine whether to show error messages or replace them and show a user friendly on. This is currently only implemented in the TryCatch util.
 4. **APP_KEY** This key is used within the app for encrypting strings (not passwords or JWT), this is only used however when generating unique urls for fixtures. It can be any string of your choice.
 5. **DB_HOST** MongoDB is used within the app as the DBMS, the host refers to the host parameter when initializing a mongoDB connection.
 6. **DB_NAME** The name of the database being connected to.
 7. **DB_USER** The username of the user being used to access the data within the database.
 8. **DB_PASSWORD** Password for the user beign used to access the database.
 9. **JWT_SECRET** This is used to sign generated JSON web token, it can be any string of your choice.
 10.**JWT_TTL ** This is used to determin the age a generated JSON web token, this should be a number. It is in seconds.

## Database
As mentioned in the section above the DBMS is mongodb to connect, please set the values for the DB_ prefixed environment variables in your .env file, the end result would look something like this. `mongodb://username:password@localhost:4004/db_name`.

## Docker
The app has been dockerized so if you'd rather use docker to run the app, first setup your environment variables using the .env file you created, after that simply run. `npm run docker:build` and then `npm run docker:run` , once running, you should be able to preview the app by going to `http://localhost:3000`.

## Project Structure
Our entry file is the index.js file found within the root of the project, this is thfile called when starting the API.
**We will use `ROOT` to refere to the root of the projects directory in this section.**
1. **Models:** The models can be found by going to. `ROOT`/app/models.
2. **Controllers:** The controllers can be found be going to `ROOT`/app/controllers.
3. **Routes:**  The routes can be found by going to. `ROOT`/routes
4. **Route Middlewares:** The route middlewares can be found by going to `ROOT`/routes/middleware.
5. **Validations:** These are the validations used to validate requests, they are simply a collection of express validations for each request that needs to be validated. You can find them by going to. `ROOT`/app/validations.
6. **Configs:** To access the configs within the project, you wouldn't need to use `process.env` directly. To access them simply go to `ROOT`/configs
7. **Tests:** The tests suites and all their stubs can be found in the following directory. `HOST`/\_\_tests__
8. Utils used within the project can be found in the following director `ROOT`/utils.

## Testing The Mic
Jest is used within the project coupled with some other libraries to run tests within the application.
#### To Run Them
Simply run the following command from within your root directory `npm test` this will run all test suites and display a code coverage for the parts of the project that have and have not been tested on the terminal.
#### To Write Them
Simply go to the designated folder within the tests folder in your root directory, you will find there folders for every feature and functionality, simply create your file and write your test there. You can find mock data and requests, and some helper functions within the `stubs` directory within the tests folder.

## Redis
I wasn't able to implement this because of time, althought the major set back was mocking it from within my test suites, I haven't used redis on a node project before so I wasn't able to figure out on time how to mock it from within my test suites.