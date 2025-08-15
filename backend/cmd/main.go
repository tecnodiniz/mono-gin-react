package main

import (
	"mono-gin-react/example/config"
	"mono-gin-react/example/database"
	"mono-gin-react/example/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()
	database.ConnectMongo()

	router := gin.Default()

	routes.SetupRoutes(router)

	router.Run(":" + config.GetPort())

}
