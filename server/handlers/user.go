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

	user := r.Context().Value(KeyUser{}).(*database.User)
	query := fmt.Sprintf("Insert into User values(%d, '%s', '%s');", user.Id, user.Username, user.Password)
	_, err := u.db.Query(query)

	if err != nil {
		panic(err)
	}
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
	u.l.Println("Handle GET users")

	result, err := u.db.Query("SELECT * FROM USER")

	if err != nil {
		panic(err)
	}
	var results database.Users
	for result.Next() {

		var id int
		var username string
		var password string

		err = result.Scan(&id, &username, &password)
		user := database.NewUser(id, username, password)
		results = append(results, user)

		if err != nil {
			panic(err)
		}
	}
	err = results.ToJSON(rw)

	if err != nil {
		panic(err)
	}
}
