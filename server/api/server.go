package api

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	db "github.com/nemanja731/Event-reminder-web/server/db/sqlc"
	"github.com/nemanja731/Event-reminder-web/server/token"
	"github.com/nemanja731/Event-reminder-web/server/util"
)

type Server struct {
	store      *db.Store
	tokenMaker token.Maker
	router     *gin.Engine
	config     util.Config
}

func NewServer(config util.Config, store *db.Store) (*Server, error) {
	tokenMaker, err := token.NewPastoMaker(config.TokenSymmetricKey)
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}
	server := &Server{
		store:      store,
		tokenMaker: tokenMaker,
		config:     config,
	}
	router := gin.Default()
	router.Use(cors.Default())

	authorized := router.Group("/")

	router.POST("/new-user", server.addUser)
	router.POST("/login", server.login)
	router.POST("/tokens/renew_access", server.renewAccessToken)

	authorized.Use(authMiddleware(server.tokenMaker))
	{
		authorized.GET("/events", server.getEvents)
		authorized.POST("/add-event", server.addEvent)
		authorized.DELETE("/delete-event", server.deleteEvent)
	}
	authorized.Use(cors.Default())

	server.router = router
	return server, nil
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
