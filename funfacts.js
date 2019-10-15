
var IntervalID;
var count = -1;
var FunFactsArr = ["a", "b", "c", "d"];


//on load run Fact Facts
window.onload =function() {
    runFunFacts();
    
};

//Fun Fact functions
function runFunFacts() {
    IntervalID = setInterval(FunFacts, 6000);
}
function FunFacts(){
    count ++;
    $("#FunFactsID").html(FunFactsArr[count]);
    
}
