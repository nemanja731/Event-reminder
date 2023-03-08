package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
)

//URI:= mongodb+srv://markomacura9:<password>@cluster0.ubx2tri.mongodb.net/?retryWrites=true&w=majority

func InsertOne(obj interface{}, client *mongo.Client) error {
	coll := client.Database("simple_app").Collection("person")

	result, err := coll.InsertOne(context.TODO(), obj)
	if err == nil {
		fmt.Println("Inserted document with _id: %v\n", result.InsertedID)
	}
	return err
}
