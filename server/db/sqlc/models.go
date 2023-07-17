// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0

package db

import (
	"time"
)

type Event struct {
	ID        int64     `json:"id"`
	IDUser    int64     `json:"id_user"`
	Title     string    `json:"title"`
	EventTime time.Time `json:"event_time"`
}

type User struct {
	ID       int64  `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Fullname string `json:"fullname"`
	Password string `json:"password"`
}
