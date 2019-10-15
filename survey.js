
Survey
.StylesManager
.applyTheme("default");

var json = {
title: "Find your next cocktail",

pages: [
    {
        title: "Which of these drinks do you typically go for?",
        questions: [
            {
                type: "radiogroup",
                name: "Drinks",
                title: "Drink Choices",
                hasOther: false,
                isRequired: true,
                choices: ["The stronger the better", "Something Fruity", "Smooth but dry", "Bitter but great"]
            }
        ]
    }, {
        title: "Which of these appetizers would you order?",
        questions: [
            {
                type: "radiogroup",
                name: "Appetizers",
                title: "So tasty",
                colCount: 2,
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
    }, 
]
};

window.survey = new Survey.Model(json);

survey
.onComplete
.add(function (result) {
    if (result.data.Drinks === "Something Fruity") { 
    document
       
        .querySelector('#surveyResult')
        .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    }

    else {
        document
       
        .querySelector('#surveyResult')
        .textContent = "NOPE";
    }
});

survey.showProgressBar = 'bottom';

$("#surveyElement").Survey({model: survey});