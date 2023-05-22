package database

import (
	"encoding/json"
	"io"
)

type User struct {
	Id       int    `json:"id"`
	FullName string `json:"fullName"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Users []*User

func NewUser(id int, fullName string, username string, password string) *User {
	return &User{Id: id, FullName: fullName, Username: username, Password: password}
}

func (u *User) FromJSON(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(u)
}

func (u *Users) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(u)
}
