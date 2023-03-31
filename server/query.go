package main

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetOne(obj User, client *mongo.Client) User {
	coll := client.Database("simple_app").Collection("user")
	ctx := context.Background()

	filter := bson.M{"Username": obj.username}
	// fmt.Println(obj)
	// fmt.Println(filter)
	var user bson.M
	if err := coll.FindOne(ctx, filter).Decode(&user); err != nil {
		log.Fatal(err)
	}

	usr := User{
		username: user["Username"].(string),
		password: user["Password"].(string),
		id:       user["id"].(int32),
	}
	return usr
}
