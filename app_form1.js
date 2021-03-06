/*
    Kevin Huang
    6/27/2019
    IBM ARC
    app.js
    
    JS file that defines controller for angulartut.html,
    reads in JSON file from local.
*/

//to store the number of entries in json "rows"
var numOfEntries;

//array of Values arrays
var arrayVals = [];

//arrays to store data to be passed into barchart
var barDataY = [];
var barDataX = [];

//create array of arrays to be passed as pieData
var pieData = [];

//variables to save the names and types of the datafields
var xField = "";
var yField = "";
var xFieldType = "";
var yFieldType = "";

var queryMessage = "";

//creates a new instance of an XMLHttpRequest and loads asynchronously response.json 
// this code was adapted from https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript

function loadJSON(callback){
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'response1.json', false);
    xobj.onreadystatechange = function (){
        if(xobj.readyState == 4 && xobj.status == "200"){
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

//initializing function to use anonymous callback (loads data from the local json file)
function init(){
    
    loadJSON(function(response) {
        var actual_JSON = JSON.parse(response);
        
        //alert("hey" + actual_JSON.question.answers[0].SQLAnswer[0].answers[0].fields[1].name);
        
        
        //get names and types of datafields
        xField = actual_JSON.question.answers[0].SQLAnswer[0].answers[0].fields[1].name;
        yField = actual_JSON.question.answers[0].SQLAnswer[0].answers[0].fields[0].name;
        xFieldType = actual_JSON.question.answers[0].SQLAnswer[0].answers[0].fields[1].type;
        yFieldType = actual_JSON.question.answers[0].SQLAnswer[0].answers[0].fields[0].type;
        
        queryMessage = actual_JSON.question.annotatedQuestion;
        
        //loop through rows array
        for(i = 0; i < actual_JSON.question.answers[0].SQLAnswer[0].answers[0].answerData.rows.length; i++) {
            arrayVals.push(actual_JSON.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i]);
            
            //assign Y values to be displayed in barDataY array
            barDataY.push(actual_JSON.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[0]);
            
            //assign X values to be displayed
            barDataX.push(actual_JSON.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[1]);
            
            //assign data pairs to the pieData
            pieData.push({label: actual_JSON.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[1], value: actual_JSON.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[0]});
        }
        
        
        
    });
}


renderGantt();
//call init to load json file and set variables
init();

//declare angular app
var app1 = angular.module('app1', []);

//variable defined in wcsfinancial 2.5 to get the user's query
var query = "";

/*

jQuery.ajax({
    url: "http://acr046mgt06.almaden.ibm.com:9090/TATZIA/api/v1/nlq/answer?q=" + query,
    type: "GET",
    contentType: 'application/json; charset=utf-8',
    success: function(resultData){
        alert("data is " + resultData);
        
    },
    error: function(jqXHR, textStatus, errorThrown){
        alert("getJSON failed, status: " + textStatus + ", error: " + errorThrown);
    },
    timeout: 1200 
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
    }
    
   
  };
    
});
