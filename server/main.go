package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/mux"
	"github.com/mmacura9/event-reminder/database"
	"github.com/mmacura9/event-reminder/handlers"
)

func main() {
	db := database.Connect()
	defer database.Disconnect(db)

	l := log.New(os.Stdout, "event-api", log.LstdFlags)

	users := handlers.NewUsers(l, db)
	sm := mux.NewRouter()

	post := sm.Methods(http.MethodPost).Subrouter()
	post.HandleFunc("/new-user", users.AddUser)

	get := sm.Methods(http.MethodGet).Subrouter()
	get.HandleFunc("/get-users", users.GetUsers)

	server := &http.Server{
		Addr:         ":9090",
		Handler:      sm,
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 1 * time.Second,
	}

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			l.Fatal(err)
		}
	}()

	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt, os.Kill)

	sig := <-sigChan
	l.Println("Received terminate, graceful shutdown", sig)

	tc, _ := context.WithTimeout(context.Background(), 30*time.Second)
	server.Shutdown(tc)

}
