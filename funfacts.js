

var IntervalID;
var count = -1;
var FunFactsArr = ["a", "b", "c", "d"];

window.onload = function () {
    runFunFacts();
}



   
    


//Fun Fact functions
function runFunFacts() {
    IntervalID = setInterval(FunFacts, 10000);
}
function FunFacts(){
    count ++;
    $("#FunFactsID").html(FunFactsArr[count]);
    
}
