package db

import (
	"context"
	"database/sql"
	"fmt"
)

type Store struct {
	*Queries
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{Queries: New(db), db: db}
}

func (store *Store) execTx(ctx context.Context, fn func(*Queries) error) error {
	tx, err := store.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	q := New(tx)
	err = fn(q)
	if err != nil {
		if rberr := tx.Rollback(); rberr != nil {
			return fmt.Errorf("tx err %v, rollback error %v", err, rberr)
		}
		return err
	}

	return tx.Commit()
}

// func (r *GetEventsFromUserRow) Scan(scanFn func(dest ...interface{}) error) error {
// 	var eventTimeStr string
// 	err := scanFn(&r.ID, &r.IDUser, &r.Title, &eventTimeStr, &r.ID_2, &r.Username, &r.Fullname, &r.Password)
// 	if err != nil {
// 		return err
// 	}

// 	parsedTime, err := time.Parse(time.RFC3339Nano, eventTimeStr)
// 	if err != nil {
// 		return err
// 	}

// 	r.EventTime = parsedTime

// 	return nil
// }
