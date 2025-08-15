package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadConfig() {
	err := godotenv.Load()
	if err != nil {
		log.Println(".env não encontrado")
	}
}

func GetMongoURI() string {
	return os.Getenv("MONGO_URI")
}

func GetDatabase() string {
	return os.Getenv("DATABASE")
}

func GetPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return port
}
