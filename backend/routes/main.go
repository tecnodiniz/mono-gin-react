package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


var router = gin.Default()

func Run(){
	router.Use(cors.New(corsconfig()))
	getRoutes()
	router.Run(":5000")
}

func getRoutes(){
	v1 := router.Group("/v1")
	addPingRoutes(v1)
	addUserRoutes(v1)
}

func corsconfig() cors.Config{
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173","http://127.0.0.1:5173"}
    config.AllowMethods = []string{"POST", "GET", "PUT", "OPTIONS"}
    config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
    config.ExposeHeaders = []string{"Content-Length"}

	return config
}