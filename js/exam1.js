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


//to store the number of entries in json "rows"
var numOfEntries;

//array of Values arrays
var arrayVals = [];

//initializing function to use anonymous callback
function init(){
    loadJSON(function(response) {
        var actual_JSON = JSON.parse(response);
   
    
        //this call gives the first value in array's first entry
        alert(actual_JSON.answers[0].answerData.rows[0].values[0]);
        
        alert(actual_JSON.answers[0].answerData.rows.length);
        
        //loop through rows array
        for(i = 0; i < actual_JSON.answers[0].answerData.rows.length; i++) {
            //alert(actual_JSON.answers[0].answerData.rows[i].values[0]);
            arrayVals.push(actual_JSON.answers[0].answerData.rows[i]);
            
        }
        
        //alert(numOfEntries);
        
    });
}

//call init to load json file
//init();

//alert(arrayVals[1].values[0]);


//declare angular app
var app1 = angular.module('app1', []);

//declare controller for html file
app1.controller('ctrl1', function($scope) {
 
  //defines value of the search box
  $scope.first = "";
 
  //function run whenever search button is hit, this is where we should call REST API and get json file.
  $scope.updateValue = function() {
    $scope.submitted = $scope.first;
    if($scope.first == "Query response"){
        $scope.submitted = "Get JSON";
        init();
        
        alert(arrayVals[1].values[0]);
    }
    
   
  };
    
});
