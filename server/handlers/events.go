package handlers

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/mmacura9/event-reminder/database"
)

type Events struct {
	l  *log.Logger
	db *sql.DB
}

func NewEvents(l *log.Logger, db *sql.DB) *Events {
	return &Events{l, db}
}

func (event *Events) GetEvents(rw http.ResponseWriter, r *http.Request) {
	event.l.Println("Handle GET events")
	username := mux.Vars(r)["username"]

	query := fmt.Sprintf("SELECT name, date FROM Event join user where user.id_user=event.id_user and user.username='%s'", username)
	result, err := event.db.Query(query)

	if err != nil {
		panic(err)
	}

	var results database.Events

	for result.Next() {
		var id int
		var id_user int
		var name string
		var date time.Time

		err = result.Scan(&id, &id_user, &name, &date)
		event := database.NewEvent(date, name)
		results = append(results, event)

		if err != nil {
			panic(err)
		}
	}
	err = results.ToJSON(rw)

	if err != nil {
		panic(err)
	}
}

type KeyEvent struct{}

func (event Events) MiddlewareEventValidation(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		event := &database.Event{}

		err := event.FromJSON(r.Body)
		if err != nil {
			http.Error(rw, "Unable to unmarshal JSON", http.StatusBadRequest)
			return
		}

		ctx := context.WithValue(r.Context(), KeyEvent{}, event)
		request := r.WithContext(ctx)

		next.ServeHTTP(rw, request)
	})
}
