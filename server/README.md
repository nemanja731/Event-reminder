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

- /new-user -> **POST** {full name, username, password, confirmation password}
- /login -> **POST** {username, password}
- /add-event -> **POST** {title, date, access token}
- /delete-event -> **DELETE** {id, access token}
- /events -> **GET** {access token}
- /tokens/renew_access -> **GET** {refresh token}

The requests which are used are POST, GET and DELETE. In each of them, in addition to the request data itself, it is necessary to send an access token in order for the request to be authorized. The access token becomes invalid after 15 minutes and when this happens, the api that sends the refresh token is called to generate a new access token. Refresh token lasts 24 hours.
