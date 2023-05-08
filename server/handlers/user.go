package handlers

import (
	"context"
	"log"
	"net/http"

	"github.com/mmacura9/event-reminder/database"
	"go.mongodb.org/mongo-driver/mongo"
)

type Users struct {
	l      *log.Logger
	client *mongo.Client
}

func NewUsers(l *log.Logger, client *mongo.Client) *Users {
	return &Users{l, client}
}

func (u *Users) AddUser(rw http.ResponseWriter, r *http.Request) {
	u.l.Println("Handle POST User")

	user := r.Context().Value(KeyUser{}).(database.User)

	database.InsertOne(user, u.client)
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
