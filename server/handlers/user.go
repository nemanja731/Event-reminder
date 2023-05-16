package handlers

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/mmacura9/event-reminder/database"
)

type Users struct {
	l  *log.Logger
	db *sql.DB
}

func NewUsers(l *log.Logger, db *sql.DB) *Users {
	return &Users{l, db}
}

func (u *Users) AddUser(rw http.ResponseWriter, r *http.Request) {
	u.l.Println("Handle POST User")

	// user := r.Context().Value(KeyUser{}).(database.User)

	// err := database.InsertOne(user, u.db)
	// if err != nil {
	// 	u.l.Println(err)
	// }
}

type KeyUser struct{}

func (u Users) MiddlewareUserValidation(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		user := &database.User{}

		err := user.FromJSON(r.Body)
		if err != nil {
			http.Error(rw, "Unable to unmarshal JSON", http.StatusBadRequest)
			return
		}

		ctx := context.WithValue(r.Context(), KeyUser{}, user)
		request := r.WithContext(ctx)

		next.ServeHTTP(rw, request)
	})
}

func (u *Users) GetUsers(rw http.ResponseWriter, r *http.Request) {
	u.l.Println("GET request")

	result, err := u.db.Query("SELECT * FROM USER")

	if err != nil {
		panic(err)
	}
	var results database.Users
	for result.Next() {

		var id int
		var username string
		var password string

		// The result object provided Scan  method
		// to read row data, Scan returns error,
		// if any. Here we read id and name returned.
		err = result.Scan(&id, &username, &password)
		user := database.NewUser(id, username, password)
		results = append(results, user)
		// handle error
		if err != nil {
			panic(err)
		}

		fmt.Printf("Id: %d Name: %s\n", user.GetId(), user.GetUsername())
	}
	fmt.Println(results)
	err = results.ToJSON(rw)

	if err != nil {
		panic(err)
	}
}
