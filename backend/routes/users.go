package routes

import (
	"backend_test/example/config"
	"backend_test/example/internal/users"
	"backend_test/example/internal/utils"
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func addUserRoutes(rg *gin.RouterGroup) {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Erro ao carregar o arquivo .env")
    }
    
    mongoClient, err := config.Conn(os.Getenv("MONGO_URI"))
    if err != nil {
        panic(err)
    }

	users_collection := mongoClient.Database(os.Getenv("DATABASE")).Collection("users")

    usersroute := rg.Group("/users")

	usersroute.GET("", func(c *gin.Context){
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()

        cursor, err := users_collection.Find(ctx, bson.M{})

        if err != nil{
            c.JSON(http.StatusInternalServerError, gin.H{"error":"Erro ao  buscar usuários"})
            return
        }

        defer cursor.Close(ctx)

        var data []users.User
        if err := cursor.All(ctx, &data); err != nil{
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao processar dados"})
        }
		c.JSON(http.StatusOK, data)
	})

    usersroute.GET("/:id", func(c *gin.Context){
        idParam := c.Param("id")

        objId, err := primitive.ObjectIDFromHex(idParam)
        if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
        return
        }

        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()

        var user users.User
         err = users_collection.FindOne(ctx, bson.M{"_id": objId}).Decode(&user)
        if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Usuário não encontrado"})
        return
    }
    c.JSON(http.StatusOK, user)

    })

    usersroute.POST("/new", func(c *gin.Context){
        var user users.User

        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
        }
        
        hashedPwd, err := utils.HashPassword(user.Password)
        if err != nil{
            c.JSON(http.StatusInternalServerError, gin.H{"error": err})
            return
        }

        user.CreatedTs=time.Now().UTC()
        user.Password=hashedPwd

        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()

        if _,err := users_collection.InsertOne(ctx, user); err != nil{
             c.JSON(http.StatusInternalServerError, gin.H{"error": err})
             return
        }

        c.JSON(http.StatusOK, gin.H{"message":"user successfully created", "user": user})

    })

    usersroute.PATCH("/:id", func(c *gin.Context){
        idParam := c.Param("id")

        objId, err := primitive.ObjectIDFromHex(idParam)
        if err != nil{
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
            return
        }

        var user users.UserUpdate

        if err := c.ShouldBindJSON(&user); err != nil{
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()

        user.UpdatedTs = time.Now().UTC()
        update := bson.M{"$set":user}

        result, err := users_collection.UpdateOne(ctx, bson.M{"_id": objId}, update)
        if err != nil{
            c.JSON(http.StatusInternalServerError, gin.H{"error": err})
            return
        }

        if result.MatchedCount == 0 {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
            return
        }

        c.JSON(http.StatusOK, gin.H{"success":"User updated", "user":user})
    })

}


