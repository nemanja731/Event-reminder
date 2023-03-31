package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func InsertOne(obj User, client *mongo.Client) error {
	coll := client.Database("simple_app").Collection("user")

	// fmt.Println(obj)
	result, err := coll.InsertOne(context.TODO(), bson.D{
		{Key: "id", Value: obj.id},
		{Key: "Username", Value: obj.username},
		{Key: "Password", Value: obj.password},
	})
	if err == nil {
		fmt.Println("Inserted document with _id: %v\n", result)
	}
	return err
}
