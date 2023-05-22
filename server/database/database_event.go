package database

import (
	"encoding/json"
	"io"
	"time"
)

type Event struct {
	Name string    `json:"name"`
	Date time.Time `json:"date"`
	// Year  int    `json:"year"`
	// Month int    `json:"month"`
	// Day   int    `json:"day"`
}

type Events []*Event

func NewEvent(date time.Time, name string) *Event {
	return &Event{Date: date, Name: name}
}

func (event *Event) FromJSON(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(event)
}

func (events *Events) ToJSON(w io.Writer) error {
	e := json.NewEncoder(w)
	return e.Encode(events)
}
