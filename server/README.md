# Server

## External sources

We use:
- [gorilla web toolkit](https://www.gorillatoolkit.org/)
- [mysql](https://www.mysql.com/)

## Starting the server

To run the server use following command:

```
go run server/main.go  
```
It is necessary to start and connect the sql database to the server in order for the database to be functional. When creating the database and tables for the first time, it is necessary to use the commands defined in the makefile:
```
make createdb  
```
```
make migrateup  
```
The first command creates a database while the second creates tables.

## APIs

The server is hosted on port 9090. The APIs created on the server are a concatenation of the URL **http://localhost:9090** and the following commands:

- /new-user
- /login
- /events
- /add-event
- /delete-event
- /tokens/renew_access

