package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/nemanja731/Event-reminder-web/server/api"
	db "github.com/nemanja731/Event-reminder-web/server/db/sqlc"
)

const (
	dbDriver      = "mysql"
	dbSource      = "root:secret@tcp(localhost:3000)/eventReminder"
	serverAddress = "0.0.0.0:8080"
)

func main() {
	conn, err := sql.Open(dbDriver, dbSource)
	if err != nil {
		log.Fatal("cannot connect to the db: ", err)
	}

	store := db.NewStore(conn)
	server := api.NewServer(store)

	err = server.Start(serverAddress)

	if err != nil {
		log.Fatal("cannot start server: ", err)
	}
}
