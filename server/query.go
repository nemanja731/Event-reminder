package main

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetOne(obj User, client *mongo.Client) User {
	coll := client.Database("simple_app").Collection("user")
	ctx := context.Background()

	filter := bson.M{"Username": obj.username}

	var user bson.M
	if err := coll.FindOne(ctx, filter).Decode(&user); err != nil {
		user = nil
	}
	usr := User{}

	if user != nil {
		usr = User{
			username: user["Username"].(string),
			password: user["Password"].(string),
			id:       user["id"].(int32),
		}
	}
	return usr
}
