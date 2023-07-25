-- name: CreateSession :execresult
INSERT INTO sessions (
    id,
    id_user,
    refresh_token,
    user_agent,
    client_ip,
    is_blocked,
    expires_at
) VALUES (
?, ?, ?, ?, ?, ?, ?
);

-- name: GetSession :one
SELECT *
FROM sessions
WHERE id = ? LIMIT 1;