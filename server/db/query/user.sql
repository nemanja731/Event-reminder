-- name: CreateUser :execresult
INSERT INTO User (username, fullname, password)
VALUES (?, ?, ?);

-- name: GetUser :one
SELECT *
FROM User
WHERE id = ? LIMIT 1;

-- name: ListUser :many
SELECT *
FROM User
ORDER BY username;

-- name: DeleteUser :exec
DELETE FROM User
WHERE id = ?;
