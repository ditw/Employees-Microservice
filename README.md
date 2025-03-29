
## Employees Microservice

### Description (Solution)

Employees Microservice to address some functionality which is useful to derive simplified summary statistics (mean, min, max) on a table dataset.

### Requirements

* NodeJS version 16.x.x or greater
* NPM version 8.11.0 or greater
* NestJS version 10.1.12 or greater
* PostgreSQL database engine version 14.x or greater

### Environment Setup

The environment variables are stored in ```.env``` file and located at the root of the application.

 ```bash
 #### create .env file at the root of the project
 
 $ touch .env

 #### Set environment variables (replace **** with the actual values)

APP_NAME==****
APP_URL=****
APP_ENVIRONMENT=****
DATABASE_HOST=****
DATABASE_PORT=****
DATABASE_USERNAME=****
DATABASE_PASSWORD=****
DATABASE_NAME=****
DATABASE_MIGRATIONS_RUN=****
MIGRATIONS_DIR=****
MIGRATIONS_TABLE_NAME=****
``` 

### Strict build and run (Solution)

```bash
npm install;
npm run migration:run;
npm run seed:run;
npm run start;
http://localhost:3000/swagger
```

### Installation and App Running (Solution)

<!-- Install the dependencies-->
```bash
$ npm install
```
<!-- To create new migration -->
```bash
$ npm run migration:create {NAME}
```
<!-- To run migration -->
```bash
$ npm run migration:run
```
<!-- To seed the database with 20 records of employees -->
```bash
$ npm run seed:run
```
<!-- To run the solution in development mode -->
```bash
$ npm run start 
```
Or
```bash
$ nest start 
```

### API Documentation

OpenAPI (Swagger) is implemented and can be accessible using the link below:
```bash http://<HOST>:<PORT>/swagger```, i.e. ```bash http://localhost:3000/swagger```bash

### Notes

* Some test cases are in progress to be impelmented for each endpoint call, however, the endpoints can be tested using the Swagger API URL.
* The currency symbol is set to 'USD' by default and omitted from the Employee DTO to avoid having different currencies as this can affect the calculation of aggregations. However, it can be visible to the end user to provide a different current by in this case, a currency converter plugin is required to convert the values and have them in a unique symbol (adding a global symbol to the employees table - Not required for this solution).
* A validation rule againt the employee entry is not defined ( to avoid having the same data values for all fields for more than one employee) as this is not a requirement and can exist logically (multiple employees can have the same name and salary in the same department/sub-department). 
* Login endpoint (using a username and password) - No database integration for this use case, the purpose is to generate a JWT and implement the authentication and authorization. To authenticate, you can use username ```username``` and password ```password``` values. Dummy users are available in the ```Users``` service. All provided endpoints require authentication.

## Description (Framework)

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation (Framework)

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
