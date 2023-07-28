-- name: CreateEvent :execresult
INSERT INTO event (id_user, title, event_time)
VALUES (
    (SELECT id FROM user WHERE user.username = ?)
    , ?, ?);

-- name: GetSpecificEventFromUser :one
SELECT *
FROM event
WHERE id = ? AND id_user = ?;

-- name: GetEvent :one
SELECT *
FROM event
WHERE id = ? LIMIT 1;

-- name: GetEventForUpdate :one
SELECT *
FROM event
WHERE id = ? LIMIT 1 FOR UPDATE;

-- name: GetAllEventsFromUser :many
SELECT event.*
FROM event, user
WHERE event.id_user = user.id AND user.username = ?
LIMIT ?, ?;

-- name: UpdateEvent :exec
UPDATE event
SET title=?, event_time = ?
WHERE id = ?;

-- name: ListEvent :many
SELECT *
FROM event
ORDER BY id;

-- name: DeleteEvent :exec
DELETE FROM event
WHERE id = ?;
