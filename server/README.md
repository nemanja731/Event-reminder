# Server side

Welcome to the server side of this project.

If the code does not work, you probably did not finish the setup for using mongoDB. For that visit the following link: https://www.mongodb.com/docs/drivers/go/current/quick-start/

Thank you for using Event-Reminder :).

## Documentation

Each file is made for specific purpose. Firstly in main, you will find making the basic server which serve on port 8080. Two handle functions for sing in and log in.

### Mongo DB

Files connect, disconnect are for connecting and disconnecting to mongoDB.

File insert is for inserting new user to the database.

File query is for getting the user of the specific username.

The last fil is check_credentials which is for checking if the user got from query has the same password as one for querying.

For now we are using the online version of mongoDB, but we are looking for changing that to a local one. The way for inserting and querying the data stays the same. The connection will be different.