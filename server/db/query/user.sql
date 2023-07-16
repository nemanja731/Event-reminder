-- name: CreateUser :execresult
INSERT INTO user (username, fullname, password)
VALUES (?, ?, ?);

-- name: GetUser :one
SELECT *
FROM user
WHERE username = ? LIMIT 1;

-- name: GetUserForUpdate :one
SELECT *
FROM user
WHERE username = ? LIMIT 1 FOR UPDATE;

-- name: ListUser :many
SELECT *
FROM user
ORDER BY username;

-- name: UpdateUser :exec
UPDATE user 
SET username=?, fullname = ?, password=?
WHERE username = ?;

-- name: DeleteUser :exec
DELETE FROM user
WHERE username = ?;
