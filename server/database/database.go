package database

import (
	"context"
	"encoding/json"
	"fmt"
	"io"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	id       int // Will be updated, so it will be auto-increment
	username string
	password string
}

func Connect() *mongo.Client {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(getUri()))
	if err != nil {
		panic(err)
	}

	return client
}

func Disconnect(client *mongo.Client) {
	if err := client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}
}

func InsertOne(obj User, client *mongo.Client) error {
	coll := client.Database("simple_app").Collection("user")

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

func (u *User) FromJSON(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(u)
}

func (u *User) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(u)
}

func IsUser(obj User, client *mongo.Client) bool {
	coll := client.Database("simple_app").Collection("user")
	ctx := context.Background()

	filter := bson.M{"Username": obj.username}

	var user bson.M
	if err := coll.FindOne(ctx, filter).Decode(&user); err != nil {
		return false
	}

	if obj.password != user["password"] {
		return false
	}

	return true
}
