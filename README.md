# Car Value Estimation API
This API allows signed-in users to get an estimation of a car value based on their location, car's make, model, year and mileage. The estimation is calculated from previous reports added by the users after being approved by the admins.

Estimation calculation: the application calculates the average price of all approved cars within +/- 5 langtitude and latitude degrees and where the model year of the car is +/- 3 years.

## Local Setup:
1. `git clone https://github.com/mmaksi/car-value.git`
2. `cd car-value`
3. `npm install`
4. `npm run typeorm:migration:generate` to generate a migration file for the database.
5. `npm run typeorm:migration:run` to generate a tables structure for the database.

## App Features:

🟣 Two roles: users and admins; users can add and get reports, and admins can accept the added reports.

🟣 Sign-up/Sign-in using JWT and cookies.

🟣 Custom middleware to attach the signed-in user to the `Request` object.

🟣 Custom `Serialize(dto)` interceptor that works with any DTO to add serialization logic.

🟣 Custom decorator to return the signed-in user that can be used anywhere in the application.

## 🛠️ Tech Stack:

NestJS, Express.js, TypeScript, TypeORM, SQLite, JWT & Cookies.

## Report Module
Diagram URL: https://i.ibb.co/nLSm7Tj/Users-Module.png
![project-architecture](https://i.ibb.co/nLSm7Tj/Users-Module.png)

## Auth Module
Diagram URL: https://i.ibb.co/m5gZN9S/Reports-Module.png
![project-architecture](https://i.ibb.co/m5gZN9S/Reports-Module.png)

