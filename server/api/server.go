package api

import (
	"github.com/gin-gonic/gin"
	db "github.com/nemanja731/Event-reminder-web/server/db/sqlc"
)

type Server struct {
	store  *db.Store
	router *gin.Engine
}

func NewServer(store *db.Store) *Server {
	server := &Server{store: store}
	router := gin.Default()

	router.POST("/new-user", server.addUser)
	router.POST("/login", server.login)
	router.GET("/events", server.getEvents)
	router.POST("/add-event", server.addEvent)

	server.router = router
	return server
}

func errorResponce(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
