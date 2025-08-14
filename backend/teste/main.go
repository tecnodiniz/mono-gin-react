package main

import (
	"fmt"
	"log"
	"os"
)


func main(){
	data, err := os.ReadFile("../users.json")
	if err != nil {
		log.Fatalf("Error reading file %s\n",err)
	}

	fmt.Printf("Data:\n%s",data)

	
}