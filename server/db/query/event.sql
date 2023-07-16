-- name: CreateEvent :execresult
INSERT INTO event (id_user, title, event_time)
VALUES (?, ?, ?);

-- name: GetEvent :one
SELECT *
FROM event
WHERE id = ? LIMIT 1;

-- name: GetEventForUpdate :one
SELECT *
FROM event
WHERE id = ? LIMIT 1 FOR UPDATE;

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
