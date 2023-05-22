package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() *sql.DB {
	db, err := sql.Open("mysql", getUri())

	if err != nil {
		panic(err)
	}

	_, err = db.Exec(
		"CREATE TABLE IF NOT EXISTS User ( id_user int NOT NULL AUTO_INCREMENT, fullname varchar(255), username varchar(255) NOT NULL, password varchar(255) NOT NULL,PRIMARY KEY (id_user));",
	)

	if err != nil {
		panic(err.Error())
	}

	_, err = db.Exec(
		"CREATE TABLE IF NOT EXISTS Event (id_event int NOT NULL AUTO_INCREMENT, id_user int NOT NULL, name varchar(255) NOT NULL, date DATETIME, PRIMARY KEY (id_event), FOREIGN KEY (id_user) REFERENCES User(id_user));",
	)

	if err != nil {
		panic(err.Error())
	}

	return db
}

func Disconnect(db *sql.DB) {
	if err := db.Close(); err != nil {
		panic(err)
	}
}
