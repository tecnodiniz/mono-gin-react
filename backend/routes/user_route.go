package routes

import (
	"mono-gin-react/example/handlers"
	"mono-gin-react/example/repositories"
	"mono-gin-react/example/services"

	"github.com/gin-gonic/gin"
)

func addUserRoutes(rg *gin.RouterGroup) {
	userRepo := repositories.NewUserRepository()
	userService := services.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	user := rg.Group("/users")
	{
		user.GET("", userHandler.GetUsers)
		user.GET("/", userHandler.GetUsers)
		user.POST("", userHandler.CreateUser)
		user.POST("/", userHandler.CreateUser)
	}
}
