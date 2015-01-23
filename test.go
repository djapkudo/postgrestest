package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"time"
)

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("postgres", "user=test dbname=test sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
}

type Msg struct {
	A int
	B int
	C string
}

func handler(w http.ResponseWriter, r *http.Request) {
	cur_time := time.Now()

	rows, err := db.Query("SELECT * from test;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	list := make([]*Msg, 0)
	for rows.Next() {
		msg := &Msg{}
		err = rows.Scan(&msg.A, &msg.B, &msg.C)
		if err != nil {
			log.Fatal(err)
		}
		list = append(list, msg)
	}

	buf, err := json.Marshal(list)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintf(w, "%s", buf)
	fmt.Println(time.Since(cur_time).Nanoseconds(), "ns")
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
