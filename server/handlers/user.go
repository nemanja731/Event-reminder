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
	data := []byte(`{"status": true}`)

	user := r.Context().Value(KeyUser{}).(*database.User)
	query := fmt.Sprintf("select * from User where username='%s'", user.Username)

	result, err := u.db.Query(query)

	if err != nil {
		u.l.Println(err)
		data = []byte(`{"status": false}`)
		rw.Write(data)
		return
	}

	if result.Next() == true {
		http.Error(rw, "Username is already taken.", http.StatusBadRequest)
		data = []byte(`{"status": false}`)
		rw.Write(data)
		return
	}

	query = fmt.Sprintf("Insert into User values(%d, '%s','%s', '%s');", user.Id, user.FullName, user.Username, user.Password)
	//should consider several queries in the same time (probably should add mutex)
	_, err = u.db.Query(query)

	if err != nil {
		u.l.Println(err)
		data = []byte(`{"status": false}`)
	}

	rw.Write(data)
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
		var fullName string
		var username string
		var password string

		err = result.Scan(&id, &fullName, &username, &password)
		user := database.NewUser(id, fullName, username, password)
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

func (u *Users) CheckUser(rw http.ResponseWriter, r *http.Request) {
	u.l.Println("Handle POST LogIn")

	user := r.Context().Value(KeyUser{}).(*database.User)
	query := fmt.Sprintf("select * from User where username='%s' and password='%s'", user.Username, user.Password)

	result, err := u.db.Query(query)

	if err != nil {
		panic(err)
	}

	data := []byte(`{"status": true}`)

	if result.Next() {
		rw.Write(data)
	} else {
		data := []byte(`{"status": false}`)
		rw.Write(data)
	}
}
