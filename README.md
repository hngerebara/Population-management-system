## Population Management System

[![Build Status](https://travis-ci.com/hngerebara/Population-management-system.svg?token=qbBk8baJpsNJr5Dz8G6p&branch=master)](https://travis-ci.com/hngerebara/Population-management-system)

Population management system is a system that contains a list of locations and the total number of residents in each location broken down by gender.


### Development

This application was developed using the following:

* NodeJs
* Express
* Mongodb

### Tools and Modules Required
The following are required to enable you run this locally
* [NodeJs](https://nodejs.org/en) - 
*  Express - fast node.js network app framework
* [Mongodb](https://docs.mongodb.com/)- The NoSQL database
* [Postman](https://www.getpostman.com/) - To test APi's
* Node Package Manager (npm)
* Terminal or Command Line
* Text Editor or IDE

### Features!

- A new Parent location and sub location can be created
- All locations can be retrieved
- Sub locations of a parent location can be retrieved, editted and deleted,
- parent location can be retrieved, editted and deleted
- Total polation for each sub location and parent location is calculated 


### How to Use
---------------------------------------------------------------------------------------------------------------------------

If you are interested in contributing to this project, Follow the instructions below to contribute.

```sh
$ git clone https://github.com/hngerebara/Population-management-system.git
$ cd <into folder>
```

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
| GET /locations | Retrieves all locations. |
| GET /locations/:locationId | Retrieves a single location |
| PUT /locations/:locationId | Update a location |
| DELETE /locations/:locationId | Delete a specific location |
| POST /locations/:locationId/sub | Create a new sub location. |
| GET /locations/:locationId/sub | Retrieves all sub locations for a given parent location. |
| GET /locations/:locationId/sub/:subId | Retrieves a single sub location |
| PUT /locations/:locationId/sub/:subId | Updates a single sub location |
| DELETE /locations/:locationId/sub/:subId | Delete a specific location |


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

