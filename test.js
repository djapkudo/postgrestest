var express = require('express');
var pg = require('pg');

var conString = "postgres://test@localhost/test";
var app = express();

app.get('/', function (req, res) {
    var cur_time = process.hrtime();
    pg.connect(conString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query("SELECT * from test;", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            done();

            res.send(result['rows']);

            var diff = process.hrtime(cur_time);
            console.log("%d ns", diff[0] * 1e9 + diff[1]);
        });
    });
});

var server = app.listen(8081, function() {});
