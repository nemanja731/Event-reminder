package api

// import (
// 	"net/http"
// 	"net/http/httptest"
// 	"testing"

// 	"github.com/nemanja731/Event-reminder-web/server/token"
// )

// func TestAuthMiddleware(t *testing.T) {
// 	testCases := []struct {
// 		name          string
// 		setupAuth     func(t *testing.T, request *http.Request, tokenMaker token.Maker)
// 		checkResponce func(t *testing.T, recoreder *httptest.ResponseRecorder)
// 	}{}

// 	for i := range testCases {
// 		tc := testCases[i]

// 		t.Run(tc.name, func(t *testing.T){
// 			server := newTestServer(t, nil)
// 		})
// 	}
// }
