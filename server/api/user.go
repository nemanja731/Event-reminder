package api

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/nemanja731/Event-reminder-web/server/db/sqlc"
)

type AddUserRequst struct {
	Username string `json:"username" binding:"required"`
	Fullname string `json:"fullname" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (server *Server) addUser(ctx *gin.Context) {
	var req AddUserRequst
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponce(err))
		return
	}

	arg := db.CreateUserParams{
		Username: req.Username,
		Password: req.Password,
		Fullname: req.Fullname,
	}

	res, err := server.store.CreateUser(ctx, arg)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponce(err))
		return
	}
	ctx.JSON(http.StatusOK, res)
}

type getUserRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (server *Server) login(ctx *gin.Context) {
	var req getUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponce(err))
		return
	}

	usr, err := server.store.GetUser(ctx, req.Username)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponce(err))
		return
	}

	if usr.Password != req.Password {
		ctx.JSON(http.StatusBadRequest, errorResponce(errors.New("Wrong password")))
		return
	}

	ctx.JSON(http.StatusAccepted, true)
}
