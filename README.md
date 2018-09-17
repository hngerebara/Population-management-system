## Population Management System

Population management system is a system that contains a list of locations and the total number of residents in each location broken down by gender.


### Development

This application was developed using the following:

* NodeJs
* Express
* Mongodb

### Requirements
The following are required to enable you run this locally

* Nodejs
* Mongodb
* Node Package Manager (npm)

### How to Use
---------------------------------------------------------------------------------------------------------------------------

If you are interested in contributing to this project, Follow the instructions below to contribute.

* Fork the repository

* create a .env file  example below
```
DB_URL = mongodb://localhost:27017/population_api
TEST_DATABASE_URL = mongodb://localhost:27017/population_api_test
```
* run `npm install`

* run `npm start`

N/B: You can test out the endpoints using postman using the endpoints given below or test using the already documented api [here](Swagger)

* run `npm test` to see passing tests

### Endpoints

| EndPoint | Functionality |
| ------ | ------ |
| POST /locations/ | Create a new location. |
| GET /locations | Retrieves all locations. ||
| GET /locations/:locationId | Retrieves a single location |
| PUT /locations/:locationId | Update a location |
| DELETE /locations/:locationId | Delete a specific location |


### How to Contribute
---------------------------------------------------------------------------------------------------------------------------
After doing the steps above, 

* Create a branch using the following format
```
feature/branchName 
```
* Make your change

* Commit your change to your forked repository

* Provide a detailed commit description stating the changes made

