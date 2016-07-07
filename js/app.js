/*
    Kevin Huang
    6/27/2019
    IBM ARC
    exam1.js
    
    JS file that defines controller for angulartut.html,
    reads in JSON file from local.
*/

//creates a new instance of an XMLHttpRequest and loads asynchronously response.json 
// this code was adapted from https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback){
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './JSON/response.json', false);
    xobj.onreadystatechange = function (){
        if(xobj.readyState == 4 && xobj.status == "200"){
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

//alert("ayy lmao");

//to store the number of entries in json "rows"
var numOfEntries;

//array of Values arrays
var arrayVals = [];

//arrays to store data to be passed into barchart
var barDataY = [];
var barDataX = [];

//create array of arrays to be passed as pieData
var pieData = [];

//initializing function to use anonymous callback
function init(){
    loadJSON(function(response) {
        var actual_JSON = JSON.parse(response);
        //this call gives the first value in array's first entry
        //alert(actual_JSON.answers[0].answerData.rows[0].values[0]);
        
        alert("called init");
        //loop through rows array
        for(i = 0; i < actual_JSON.answers[0].answerData.rows.length; i++) {
            //alert(actual_JSON.answers[0].answerData.rows[i].values[0]);
            arrayVals.push(actual_JSON.answers[0].answerData.rows[i]);
            
            
            //assign Y values to be displayed in barDataY array
            barDataY.push(actual_JSON.answers[0].answerData.rows[i].values[0]);
            
            //assign X values to be displayed
            barDataX.push(actual_JSON.answers[0].answerData.rows[i].values[1]);
            
            //assign data pairs to the pieData
            pieData.push({label: actual_JSON.answers[0].answerData.rows[i].values[1], value: actual_JSON.answers[0].answerData.rows[i].values[0]});
        }
        
        //alert(numOfEntries);
        
    });
}


//call init to load json file
init();

//declare angular app
var app1 = angular.module('app1', []);

//variable defined in wcsfinancial 2.5
//var query = message.question.text;
var query = "";

//TODO: import jquery for ajax call

//ajax call from the app.js in wcsfinancial 2.5
 /*var deferred = $.ajax({
					            url: "/TATZIA/api/v1/nlq/answer?q=" + query,
					            type: "GET",
					            contentType: "application/json",
					            headers: {"Content-Type": "application/json", "Accept": "application/json"},
                                 // url: "/TATZIA/api/v1/question",
                                 // type: "POST",
                                 // contentType: "application/json",
                                 // headers: {"Content-Type": "application/json", "Accept": "application/json"},
                                 //   data: JSON.stringify(message),
                                 // dataType: "json"
                              });

*/
//declare controller for html file
app1.controller('ctrl1', function($scope) {
    
    
 
    //defines value of the search box
    $scope.first = "";
    
    $scope.numEntries = numOfEntries;
    
 
    //function run whenever search button is hit, this is where we should call REST API and get json file.
    $scope.updateValue = function() {
    $scope.submitted = $scope.first;
        
    query = $scope.first;
    
    if($scope.first == "Query response"){
        $scope.submitted = "Get JSON";
        //init();
        
        alert(arrayVals[1].values[0]);
    }
    
   
  };
    
});