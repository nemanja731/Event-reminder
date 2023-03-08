package main

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

func Disconnect(client *mongo.Client) {
	if err := client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}
}
