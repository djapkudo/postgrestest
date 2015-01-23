1. Expects a postgres DB with a user "test", a database "test", and a table "test".
2. Create the table "test" with the following values: (a int, b int, c varchar(80)).
3. "curl localhost:8080" for go and "curl localhost:8081" for node.
   a. Each outputs the time the request took in nanoseconds.