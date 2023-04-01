package main

func checkCredentials(userDb User, userQuery User) bool {
	if userDb.username == userQuery.username && userDb.password == userQuery.password {
		return true
	}
	return false
}
