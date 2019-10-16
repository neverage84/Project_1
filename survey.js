
Survey
.StylesManager
.applyTheme("default");

var json = {
title: "Find your next cocktail",

pages: [
    {
        title: "Which of these liquors do you prefer?",
        questions: [
            {
                type: "radiogroup",
                name: "Liquor",
                title: "Liquor Type",
                hasOther: false,
                isRequired: true,
                choices: ["Vodka", "Gin", "Rum", "Bourbon", "Whiskey","Scotch"]
            }
        ]
    }, 
    {
        title: "Which of these drinks do you typically go for?",
        questions: [
            {
                type: "radiogroup",
                name: "Drinks",
                title: "Drink Choices",
                hasOther: false,
                isRequired: true,
                choices: ["The stronger the better", "Something Fruity", "Smooth but dry", "Bitter but great", "Sour or Tart","Something simple - alcohol plus 1 or 2 ingredients"]
            }
        ]
    },
     
    {
        title: "Which of these appetizers would you order?",
        questions: [
            {
                type: "radiogroup",
                name: "Appetizers",
                title: "So tasty",
                colCount: 3,
                isRequired: true,
                choices: [
                    "Buffalo Wings",
                    "Spinach Artichoke Dip",
                    "Mozzerella Sticks",
                    "Poke",
                    "Nachos",
                    "Light salad",
                    "I'll wait for the entree",
                    
                   
                ]
            }
        ]
    }, {
        title: "After a long stressful day, which one sounds like you?",
        questions: [
            {
                type: "radiogroup",
                name: "Stress",
                title: "Recovery time",
                isRequired: true,
                choices: [
                    "Gonna squeeze in a nap",
                    "What's on netflix tonight?",
                    "Which friend can I vent to?",
                    "I need a drink",
                    "Gym time",
                    
                    
                   
                ]
            }
        ]
    }, {
        title: "What kind of person are you at a party?",
        questions: [
            {
                type: "radiogroup",
                name: "Party",
                title: "What's your personality?",
                isRequired: true,
                choices: [
                    "Life of the party - I've got stories for days!",
                    "I'm wherever the dance floor is",
                    "I chime in with a clever comment and pick my moments",
                    "Someone is usually crying on my shoulder",
                    "Quietly waiting to make my exit",
             
                ]
            }
        ]
    }, {
        title: "Where's the best place to relax?",
        questions: [
            {
                type: "radiogroup",
                name: "Relax",
                title: "Kumbaya",
                isRequired: true,
                choices: [
                    "Tropical beach with a sunset",
                    "Cabin in the forest",
                    "My own home is best place on earth",
                    "Drifting aimlessly on a boat",
                    "Around people I'm comfortable with",
             
                ]
            }
        ]
    }
]
};

window.survey = new Survey.Model(json);

survey
.onComplete
.add(function (result) {
    if (result.data.Drinks === "Something Fruity" && result.data.Relax === "Tropical beach with a sunset") { 
    document
       
        $("#surveyElement").hide()
         
         $("#IMGID").html("<img src=images/MaiTai.jpeg>" + "<br>" + "<br>" + "<h2> Mai Tai </h2>");
         
    }
    if (result.data.Drinks === "Something Fruity" && result.data.Relax === "Around people I'm comfortable with") { 
        document
           
            $("#surveyElement").hide()
             
             $("#IMGID").html("<img src=images/daiquiri.jpeg>" + "<br>" + "<br>" + "<h2> Daiquiri </h2>");
             
        }
    if (result.data.Drinks === "Something Fruity" && result.data.Relax === "Cabin in the forest") { 
            document
               
                $("#surveyElement").hide()
                 
                 $("#IMGID").html("<img src=images/MalibuSunset.jpeg>" + "<br>" + "<br>" + "<h2> Malibu Sunset </h2>");
                 
            }
    

    else {
        document
        $("#surveyElement").hide()
        $("#IMGID").html("<img src=images/LongIslandIceTea.jpeg>" + "<br>" + "<br>" + "<h2> Long Island Ice Tea </h2>");
    }
});

survey.showProgressBar = 'bottom';

$("#surveyElement").Survey({model: survey});


