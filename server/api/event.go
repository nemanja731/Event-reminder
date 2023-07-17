package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	db "github.com/nemanja731/Event-reminder-web/server/db/sqlc"
)

type AddEventRequest struct {
	Title     string    `json:"title" binding: "required"`
	EventTime time.Time `json:"event_time"`
}

func (server *Server) addEvent(ctx *gin.Context) {
	var req AddEventRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponce(err))
		return
	}

	arg := db.CreateEventParams{
		Title:     req.Title,
		EventTime: req.EventTime,
	}

	res, err := server.store.CreateEvent(ctx, arg)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponce(err))
		return
	}
	ctx.JSON(http.StatusOK, res)
}

type getEventRequest struct {
	Limit  int32 `uri:"limit" binding:"required,min=5,max=10"`
	Offset int32 `uri:"offset" binding:"required,min=1"`
}

func (server *Server) getEvents(ctx *gin.Context) {
	var req getEventRequest
	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponce(err))
		return
	}

	var arg db.GetEventsFromUserParams = db.GetEventsFromUserParams{Username: "mmacura9", Offset: req.Offset, Limit: req.Limit}
	events, err := server.store.GetEventsFromUser(ctx, arg)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponce(err))
		return
	}

	ctx.JSON(http.StatusAccepted, events)
}
