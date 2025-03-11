let questions = [
    { question: "What trait do you value most?", options: ["Bravery", "Loyalty", "Wisdom", "Ambition"] },
    { question: "What is your favorite magical creature?", options: ["Phoenix", "Hippogriff", "Owl", "Basilisk"] },
    { question: "Which subject interests you the most?", options: ["Defense Against the Dark Arts", "Herbology", "Charms", "Potions"] },
    { question: "How do you handle challenges?", options: ["Head-on, no matter the risk", "By working hard and staying dedicated", "With careful thought and strategy", "By assessing how I can use the challenge to my advantage"] },
    { question: "What do you think is the most important for success?", options: ["Bravery in the face of adversity", "Hard work and determination", "Cleverness and creative thinking", "Ambition and cunning"] }
];

let scores = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 };
let currentQuestion = -1;

function displayQuestion() {
    let questionText = document.getElementById("question");
    let optionsDiv = document.getElementById("options");
    let nextButton = document.getElementById("next-button");

    if (currentQuestion === -1) {
        // Welcome screen
        questionText.innerText = "Welcome to the Sorting Hat Quiz!";
        optionsDiv.innerHTML = "";
        nextButton.innerText = "Start";
        nextButton.disabled = false;
    } else {
        // Display a question
        let q = questions[currentQuestion];
        questionText.innerText = q.question;
        optionsDiv.innerHTML = "";
        
        q.options.forEach(option => {
            let btn = document.createElement("button");
            btn.innerText = option;
            btn.classList.add("option-button"); // Style class

            btn.onclick = function() {
                // Remove selection from all buttons
                document.querySelectorAll("#options button").forEach(b => b.classList.remove("selected"));

                // Highlight the selected button
                btn.classList.add("selected");

                // Assign points and enable Next button
                assignPoints(option);
                nextButton.disabled = false;
            };

            optionsDiv.appendChild(btn);
        });

        nextButton.innerText = "Next"; // Change button text after start
        nextButton.disabled = true; // Disable Next until an answer is selected
    }
}


function assignPoints(choice) {
    if (choice === "Bravery" || choice === "Phoenix" || choice === "Defense Against the Dark Arts" || choice === "Head-on, no matter the risk" || choice === "Bravery in the face of adversity") {
        scores.Gryffindor++;
    } else if (choice === "Loyalty" || choice === "Hippogriff" || choice === "Herbology" || choice === "By working hard and staying dedicated" || choice === "Hard work and determination") {
        scores.Hufflepuff++;
    } else if (choice === "Wisdom" || choice === "Owl" || choice === "Charms" || choice === "With careful thought and strategy" || choice === "Cleverness and creative thinking") {
        scores.Ravenclaw++;
    } else {
        scores.Slytherin++;
    }
    document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        document.getElementById("next-button").disabled = true;
    } else {
        let house = getResult();
        document.getElementById("result").innerText = "You belong to " + house + "!";
    }
}

function getResult() {
    let maxScore = Math.max(...Object.values(scores));
    for (let house in scores) {
        if (scores[house] === maxScore) {
            return house;
        }
    }
}

displayQuestion();
