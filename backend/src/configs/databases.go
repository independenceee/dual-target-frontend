package configs

import (
	"dualtarget-backend/src/constants"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/models"
	"fmt"
	"log"
	"strconv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Database() *gorm.DB {
	env := constants.ReadEnv()

	DATABASE_PORT, err := strconv.ParseUint(env.DATABASE_PORT, 10, 64)
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// connect to database
	sqlConnection := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", env.DATABASE_HOST, DATABASE_PORT, env.DATABASE_USER, env.DATABASE_PASSWORD, env.DATABASE_NAME)
	database, err := gorm.Open(postgres.Open(sqlConnection), &gorm.Config{})
	helpers.ErrorPanic(err)

	// migrate database
	database.Table("accounts").AutoMigrate(&models.Account{})
	database.Table("transactions").AutoMigrate(&models.Transaction{})

	return database
}
