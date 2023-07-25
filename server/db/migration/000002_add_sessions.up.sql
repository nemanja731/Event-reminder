CREATE TABLE `sessions` (
    `id` VARCHAR(100) PRIMARY KEY,
    `id_user` BIGINT UNSIGNED NOT NULL,
    `refresh_token` VARCHAR(511) NOT NULL,
    `user_agent` VARCHAR(255) NOT NULL,
    `client_ip` VARCHAR(45) NOT NULL,
    `is_blocked` BOOLEAN NOT NULL DEFAULT false,
    `expires_at` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `sessions` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);
