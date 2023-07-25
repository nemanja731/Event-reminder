package api

import (
	"testing"
	"time"

	db "github.com/nemanja731/Event-reminder-web/server/db/sqlc"
	"github.com/nemanja731/Event-reminder-web/server/util"
	"github.com/stretchr/testify/require"
)

func newTestServer(t *testing.T, store db.Store) *Server {
	config := util.Config{
		TokenSymmetricKey:   util.RandomString(32),
		AccessTokenDuration: time.Minute,
	}

	server, err := NewServer(config, &store)
	require.NoError(t, err)

	return server
}
