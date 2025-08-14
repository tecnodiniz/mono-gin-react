package users

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID          primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
    Username    string              `json:"username" binding:"required,min=3,max=50"`
    Password    string              `json:"password" binding:"required,min=8"`
    Roles       []string            `json:"roles"`
    Preferences UserPreferences     `json:"preferences"`
    Active      bool                `json:"active"`
    CreatedTs   time.Time           `json:"created_ts"`
    UpdatedTs   time.Time           `json:"updated_ts"`
}

type UserPreferences struct {
    Timezone string `json:"timezone"`
}   

type UserResponse struct {
    Username    string      `json:"username"`
    Roles       []string    `json:"roles"`
    Timezone    string      `json:"timezone"`
    Active      bool        `json:"active"`
    CreatedAt   string      `json:"created_ts"`
    UpdatedTs   time.Time   `json:"updated_ts"`
}

type UserUpdate struct {
    Username        *string        `json:"username,omitempty" binding:"required,min=3,max=50"`
    Roles           *[]string      `json:"roles,omitempty"`
    Active          *bool          `json:"active,omitempty"`
    UpdatedTs       time.Time      

}