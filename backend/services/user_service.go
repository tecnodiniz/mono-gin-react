package services

import (
	"mono-gin-react/example/models"
	"mono-gin-react/example/repositories"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserService interface {
	CreateUser(user models.User) (primitive.ObjectID, error)
	GetUsers() ([]models.User, error)
}

type userService struct {
	repo repositories.UserRepository
}

// CreateUser implements UserService.
func (s *userService) CreateUser(user models.User) (primitive.ObjectID, error) {
	return s.repo.Create(user)
}

// GetUsers implements UserService.
func (s *userService) GetUsers() ([]models.User, error) {
	return s.repo.FindAll()
}

func NewUserService(repo repositories.UserRepository) UserService {
	return &userService{repo}
}
