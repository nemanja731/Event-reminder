package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
	db "github.com/nemanja731/Event-reminder-web/server/db/sqlc"
	"github.com/nemanja731/Event-reminder-web/server/token"
)

type Server struct {
	store      *db.Store
	tokenMaker token.Maker
	router     *gin.Engine
}

func NewServer(store *db.Store) (*Server, error) {
	tokenMaker, err := token.NewPastoMaker("12345678901234567890123456789012")
	if err != nil {
		return nil, fmt.Errorf("cannot create token maker: %w", err)
	}
	server := &Server{
		store:      store,
		tokenMaker: tokenMaker,
	}
	router := gin.Default()

	authorized := router.Group("/")

	router.POST("/new-user", server.addUser)
	router.POST("/login", server.login)

	authorized.Use(authMiddleware(server.tokenMaker))
	{
		authorized.GET("/events", server.getEvents)
		authorized.POST("/add-event", server.addEvent)
	}

	server.router = router
	return server, nil
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
