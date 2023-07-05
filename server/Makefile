mysql:
	docker run --name mysql -p 3000:3306 -e MYSQL_ROOT_PASSWORD=secret -d mysql

createdb:
	docker exec -it mysql mysql -u root -psecret -e "CREATE DATABASE eventReminder;"

dropdb:
	docker exec -it mysql mysql -u root -psecret -e "DROP DATABASE eventReminder;"

migrateup:
	migrate -path db/migration -database "mysql://root:secret@tcp(localhost:3000)/eventReminder" -verbose up

migratedown:
	migrate -path db/migration -database "mysql://root:secret@tcp(localhost:3000)/eventReminder" -verbose down

sqlcinit:
	docker run --rm -v "$(pwd):/src" -w /src kjconroy/sqlc init

sqlcgenerate:
	docker run --rm -v "$(pwd):/src" -w /src kjconroy/sqlc generate

.PHONY: mysql createdb dropdb migrateup migratedown sqlcinit sqlcgenerate
