package main

import (
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	id       int32
	username string
	password string
}

var client *mongo.Client

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")
	doc := User{id: 1, username: username, password: password}

	user := GetOne(doc, client)
	isSame := checkCredentials(user, doc)

	if isSame {
		fmt.Fprintf(w, "True")
	} else {
		fmt.Fprintf(w, "False")
	}
}

func signInHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	doc := User{id: 1, username: username, password: password}

	if err := InsertOne(doc, client); err != nil {
		fmt.Println(err.Error())
	}
}

func main() {
	// link for the mongoDB
	uri := getUri()

	// connect to the mongoDB
	client = Connect(uri)

	defer Disconnect(client)

	// define handle functions
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/signin", signInHandler)

	fmt.Printf("Starting server at port 8080\n")

	// Listen and serve port 8080
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

}
