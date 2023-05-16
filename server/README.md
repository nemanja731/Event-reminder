# Server

## External sources
We use [gorilla web toolkit](https://www.gorillatoolkit.org/).

## Starting the server

To run the server you firstly need to open the folder server inside your terminal.

```bash
cd server
```

Then just run the command 

```bash
go run .
```

## APIs

The server is hosted on port 9090. The POST request for adding new user is: 
```
localhost:9090/new-user
```
Additionally to use this API you should provide the credentials of the user in json format. The format of the json should be:
```
{
    "id":<int>,
    "username":<string>,
    "password":<string>
}
```