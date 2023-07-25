package token

// import (
// 	"fmt"
// 	"time"

// 	"github.com/golang-jwt/jwt/v5"
// )

// const minSecretKeySize = 32

// type JWTMaker struct {
// 	secretKey string
// }

// func NewJWTMaker(secretKey string) (Maker, error) {
// 	if len(secretKey) < minSecretKeySize {
// 		return nil, fmt.Errorf("invalid key size: must be at least %d characters", minSecretKeySize)
// 	}
// 	return &JWTMaker{secretKey: secretKey}, nil
// }

// func (maker *JWTMaker) CreateToken(username string, duration time.Duration) (string, error) {
// 	payload, err := NewPayload(username, duration)
// 	if err != nil {
// 		return "", err
// 	}

// 	jwtToken := jwt.NewWithClaims(
// 		jwt.SigningMethodHS256,
// 		jwt.MapClaims{
// 			"ID":  payload.ID,
// 			"iss": payload.Username,
// 			"iat": payload.IssuedAt,
// 			"exp": payload.ExpiredAt,
// 		})

// 	return jwtToken.SignedString([]byte(maker.secretKey))
// }

// func (maker *JWTMaker) VerifyToken(token string) (*Payload, error) {
// 	keyFunc := func(token *jwt.Token) (interface{}, error) {
// 		_, ok := token.Method.(*jwt.SigningMethodHMAC)
// 		if !ok {
// 			return nil, ErrorInvalidToken
// 		}
// 		return []byte(maker.secretKey), nil
// 	}

// 	jwtToken, err := jwt.ParseWithClaims(token, &jwt.MapClaims{}, keyFunc)

// 	if err != nil {
// 		return nil, ErrorInvalidToken
// 	}
// 	payload, ok := jwtToken.Claims.(jwt.MapClaims)

// 	if !ok {
// 		return nil, ErrorInvalidToken
// 	}

// 	return payload, nil
// }
