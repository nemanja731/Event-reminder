// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0
// source: event.sql

package db

import (
	"context"
	"database/sql"
	"time"
)

const createEvent = `-- name: CreateEvent :execresult
INSERT INTO event (id_user, title, event_time)
VALUES (
    (SELECT id FROM user WHERE user.username = ?)
    , ?, ?)
`

type CreateEventParams struct {
	Username  string    `json:"username"`
	Title     string    `json:"title"`
	EventTime time.Time `json:"event_time"`
}

func (q *Queries) CreateEvent(ctx context.Context, arg CreateEventParams) (sql.Result, error) {
	return q.db.ExecContext(ctx, createEvent, arg.Username, arg.Title, arg.EventTime)
}

const deleteEvent = `-- name: DeleteEvent :exec
DELETE FROM event
WHERE id = ?
`

func (q *Queries) DeleteEvent(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteEvent, id)
	return err
}

const getEvent = `-- name: GetEvent :one
SELECT id, id_user, title, event_time
FROM event
WHERE id = ? LIMIT 1
`

func (q *Queries) GetEvent(ctx context.Context, id int64) (Event, error) {
	row := q.db.QueryRowContext(ctx, getEvent, id)
	var i Event
	err := row.Scan(
		&i.ID,
		&i.IDUser,
		&i.Title,
		&i.EventTime,
	)
	return i, err
}

const getEventForUpdate = `-- name: GetEventForUpdate :one
SELECT id, id_user, title, event_time
FROM event
WHERE id = ? LIMIT 1 FOR UPDATE
`

func (q *Queries) GetEventForUpdate(ctx context.Context, id int64) (Event, error) {
	row := q.db.QueryRowContext(ctx, getEventForUpdate, id)
	var i Event
	err := row.Scan(
		&i.ID,
		&i.IDUser,
		&i.Title,
		&i.EventTime,
	)
	return i, err
}

const getEventsFromUser = `-- name: GetEventsFromUser :many
SELECT event.id, id_user, title, event_time, user.id, username, fullname, password
FROM event, user
WHERE event.id_user = user.id AND user.username = ?
LIMIT ?, ?
`

type GetEventsFromUserParams struct {
	Username string `json:"username"`
	Offset   int32  `json:"offset"`
	Limit    int32  `json:"limit"`
}

type GetEventsFromUserRow struct {
	ID        int64     `json:"id"`
	IDUser    int64     `json:"id_user"`
	Title     string    `json:"title"`
	EventTime time.Time `json:"event_time"`
	ID_2      int64     `json:"id_2"`
	Username  string    `json:"username"`
	Fullname  string    `json:"fullname"`
	Password  string    `json:"password"`
}

func (q *Queries) GetEventsFromUser(ctx context.Context, arg GetEventsFromUserParams) ([]GetEventsFromUserRow, error) {
	rows, err := q.db.QueryContext(ctx, getEventsFromUser, arg.Username, arg.Offset, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetEventsFromUserRow
	for rows.Next() {
		var i GetEventsFromUserRow
		if err := rows.Scan(
			&i.ID,
			&i.IDUser,
			&i.Title,
			&i.EventTime,
			&i.ID_2,
			&i.Username,
			&i.Fullname,
			&i.Password,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listEvent = `-- name: ListEvent :many
SELECT id, id_user, title, event_time
FROM event
ORDER BY id
`

func (q *Queries) ListEvent(ctx context.Context) ([]Event, error) {
	rows, err := q.db.QueryContext(ctx, listEvent)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Event
	for rows.Next() {
		var i Event
		if err := rows.Scan(
			&i.ID,
			&i.IDUser,
			&i.Title,
			&i.EventTime,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateEvent = `-- name: UpdateEvent :exec
UPDATE event
SET title=?, event_time = ?
WHERE id = ?
`

type UpdateEventParams struct {
	Title     string    `json:"title"`
	EventTime time.Time `json:"event_time"`
	ID        int64     `json:"id"`
}

func (q *Queries) UpdateEvent(ctx context.Context, arg UpdateEventParams) error {
	_, err := q.db.ExecContext(ctx, updateEvent, arg.Title, arg.EventTime, arg.ID)
	return err
}
