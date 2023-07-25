package util

import (
	"math/rand"
	"strings"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

func RandomInt(min, max int64) int64 {
	return min + rand.Int63n(max-min+1)
}

func RandomString(n int) string {
	var sb strings.Builder
	k := 'z' - 'a'

	for i := 0; i < n; i++ {
		c := 'a' + uint8(RandomInt(0, int64(k)))
		sb.WriteByte(c)
	}

	return sb.String()
}

func RandomUsername() string {
	return RandomString(6)
}

func RandomFullname() string {
	return RandomString(5) + " " + RandomString(5)
}

func RandomPassword() string {
	return RandomString(7)
}
