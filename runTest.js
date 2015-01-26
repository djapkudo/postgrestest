var request = require('request');
var url = "http://localhost:8081"
var maxRequestCount = 10;
var totalRequests = 1000;
var requestCount = 0;
var count = 0;

var date = new Date();

console.log("Start Test");

function what(){

  if(count >= totalRequests){

    var endDate = new Date();

    console.log( endDate - date + " ms");

    console.log("FINISHED");

  } else if (requestCount < maxRequestCount ){


    requestCount++;

    request( url, function (err, response, body) {

      requestCount--;
      count++;

      if( !err ){

      } else {

        throw "AHHHH!!!";

      }

    });

    what();


  } else {

    setTimeout(function(){
      what()
    }, 10 );

  }

}

what();
