package database

import (
	"database/sql"
	"encoding/json"
	"io"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"-"`
}

func (u User) GetId() int {
	return u.Id
}

func (u User) GetUsername() string {
	return u.Username
}

func NewUser(id int, username string, password string) *User {
	return &User{Id: id, Username: username, Password: password}
}

type Users []*User

func Connect() *sql.DB {
	db, err := sql.Open("mysql", getUri())

	if err != nil {
		panic(err)
	}

	_, err = db.Exec(
		"CREATE TABLE IF NOT EXISTS User ( id_user int NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, password varchar(255) NOT NULL,PRIMARY KEY (id_user));",
	)

	if err != nil {
		panic("Line 38 " + err.Error())
	}

	_, err = db.Exec(
		"CREATE TABLE IF NOT EXISTS Event (id_event int NOT NULL AUTO_INCREMENT, id_user int NOT NULL, name varchar(255) NOT NULL, time varchar(255), PRIMARY KEY (id_event), FOREIGN KEY (id_user) REFERENCES User(id_user));",
	)

	if err != nil {
		panic("Line 46 " + err.Error())
	}

	return db
}

func Disconnect(db *sql.DB) {
	if err := db.Close(); err != nil {
		panic(err)
	}
}

// func InsertOne(obj User, db *sql.DB) error {

// }

func (u *User) FromJSON(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(u)
}

func (u *Users) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(u)
}

// func IsUser(obj User, db *sql.DB) bool {
// 	coll := client.Database("simple_app").Collection("user")
// 	ctx := context.Background()

// 	filter := bson.M{"Username": obj.username}

// 	var user bson.M
// 	if err := coll.FindOne(ctx, filter).Decode(&user); err != nil {
// 		return false
// 	}

// 	if obj.password != user["password"] {
// 		return false
// 	}

// 	return true
// }
