package config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


func Conn(uri string)(*mongo.Client, error){
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil{
		return nil, err
	}

	    if err := client.Ping(ctx, nil); err != nil {
        return nil, err
    }

	log.Println("✅ MongoDB conectado com sucesso")
    return client, nil
}