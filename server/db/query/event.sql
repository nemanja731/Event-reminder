-- name: CreateEvent :execresult
INSERT INTO Event (id_user, title, event_time)
VALUES (?, ?, ?);

-- name: GetEvent :one
SELECT *
FROM Event
WHERE id = ? LIMIT 1;

-- name: ListEvent :many
SELECT *
FROM Event
ORDER BY id;

-- name: DeleteEvent :exec
DELETE FROM Event
WHERE id = ?;
