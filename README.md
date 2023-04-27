# Advanced Server-Side Languages - final is working on this branch


## Installing the project files

Create a directory, and inside that directory create a new project using the terminal command `npm init -y`

[docs.npmjs.com/cli/v8/commands/npm-install](https://docs.npmjs.com/cli/v8/commands/npm-install)

This will generate a package.json file.

Next install express using `npm install express --save`

[expressjs.com/en/starter/installing.html ](https://expressjs.com/en/starter/installing.html)

[npmjs.com/package/express](https://www.npmjs.com/package/express)

Create an entry point for the server index.js or server.js file

Simple set up: 

`const express = require('express')`

`const app = express()`

`app.get('/home', (req, res) => {
    res.json("home")
})`

`app.listen(3000)`

Install nodemon. Nodemon is a tool used for automatically restarting a Node.js application when changes are made to the source code.

`npm install --save-dev nodemon`

Then add a script to the package.json file:

`"dev":"nodemon server.js"`


Create a src folder/directory. Tis is where you controllers and model, and migrations folders will go.

Using Homebrew, install mysql.

`brew install mysql`

`npm install --save sequelize`

`npm install --save mysql2`

`npm install --save-dev sequelize-cli`

cd src

`npx sequelize-cli`

`npx sequelize-cli init`

This will add configurtion along with folders in your src folder

In the new config folder, update the config.json file by renaming the database, in my case I named it 'asl_project'.

While still inside the src folder, create the database using the command `npx sequelize-cli db:create`

#### Generate Models
To view all of the available comands, enter:

`npx sequelize-cli`

To generate a new model:

`npx sequelize-cli model:generate --name=Quiz --attributes=name:string,weight:integer`

This generates a model named Quiz with the attributes name (which is a string) and weight (which is an integer)

Next, we will migrate all of the unrun migrations

`npx sequelize-cli db:migrate` 


To see this new table created by the migration command, go into MySQL using the command:

`mysql -uroot`

To view all of your databases, enter:

`show databases;`

To use the desired database, run the command:

`use database_name;`

In my case it is:

`use asl_project;`

To view the tables, enter tha cammons:

`show tables;`


The command `SELECT * FROM TableName;` is an SQL query that retrieves all records and columns from the "SequelizeMeta" table in a database.

If you want to undo a migration, use the command:

`npx sequelize-cli db:migrate:undo` 

 This will take the model table out of the database.
 
 Resource: 
 [https://sequelize.org/](https://sequelize.org/)
 
 
npx sequelize-cli model:generate --name=Quiz --attributes=name:string,weight:integer

npx sequelize-cli model:generate --name=Question --attributes=question:string,quizId:integer

npx sequelize-cli model:generate --name=Choice --attributes=label:string

npx sequelize-cli model:generate --name=LoginToken --attributes=token:string


Pakages used:

[https://www.npmjs.com/package/request](https://www.npmjs.com/package/request)