package db

import (
	"context"
	"testing"

	"github.com/nemanja731/Event-reminder-web/server/util"
	"github.com/stretchr/testify/require"
)

func createRandomUser(t *testing.T) {
	arg := CreateUserParams{
		Username: util.RandomUsername(),
		Fullname: util.RandomFullname(),
		Password: util.RandomPassword(),
	}

	_, err := testQueries.CreateUser(context.Background(), arg)

	require.NoError(t, err)
}

func TestCreateUser(t *testing.T) {
	arg := CreateUserParams{
		Username: util.RandomUsername(),
		Fullname: util.RandomFullname(),
		Password: util.RandomPassword(),
	}

	_, err := testQueries.CreateUser(context.Background(), arg)

	require.NoError(t, err)

}

func TestGetUser(t *testing.T) {

}
