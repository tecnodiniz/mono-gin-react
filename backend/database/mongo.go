package database

import (
	"context"
	"log"
	"mono-gin-react/example/config"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func ConnectMongo() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(config.GetMongoURI()))
	if err != nil {
		log.Fatal("Erro ao conectar no MongoDB:", err)
	}

	Client = client
	log.Println("Conectado ao MongoDB")

}

func GetCollection(name string) *mongo.Collection {
	return Client.Database(config.GetDatabase()).Collection(name)
}
