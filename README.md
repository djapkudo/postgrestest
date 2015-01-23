1. Expects a postgres DB with a user "test", a database "test", and a table "test".
2. Create the table "test" with the following values: (a int, b int, c varchar(80)).
3. "curl localhost:8080" for go and "curl localhost:8081" for node.
   a. Each outputs the time the request took in nanoseconds.

1. Run the deisred program and cat to tmp.txt
2. In a seperate shell: for i in `seq 1 X`; do curl <host:port>; done
3. Kill the program.
4. To get the average ns: awk '{ s+=$1; t+=1 } END { print s / t }' tmp.txt