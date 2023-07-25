package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/nemanja731/Event-reminder-web/server/api"
	db "github.com/nemanja731/Event-reminder-web/server/db/sqlc"
	"github.com/nemanja731/Event-reminder-web/server/util"
)

func main() {
	config, err := util.LoadConfig("server")

	if err != nil {
		log.Fatal("cannot load config: ", err)
	}

	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to the db: ", err)
	}

	store := db.NewStore(conn)
	server, err := api.NewServer(config, store)

	if err != nil {
		log.Fatal("cannot start server: ", err)
	}

	err = server.Start(config.ServerAddress)

	if err != nil {
		log.Fatal("cannot start server: ", err)
	}
}
