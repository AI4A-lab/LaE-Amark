// API URLs
const getQuestionAPI = "https://llm-evaluators-ans-6abe2bd02f24.herokuapp.com/qa_data";
const submitScoreAPI = "https://llm-evaluators-ans-6abe2bd02f24.herokuapp.com/marking";
const datasetEntryAPI = "https://llm-evaluators-ans-6abe2bd02f24.herokuapp.com/database_event";

// get data from the URL
// URL parameters
const urlParams = new URLSearchParams(window.location.search);

const encrypt_name = urlParams.get('name');
const encrypt_id = urlParams.get('reg');
const encrypt_email = urlParams.get('email');
const encrypt_phone = urlParams.get('phone');

const question_type_number = urlParams.get('type');

// Decrypt the data
const u_name = encrypt_name.split('').reverse().join('');
const u_reg = encrypt_id.split('').reverse().join('');
const u_email = encrypt_email.split('').reverse().join('');
const u_phone = encrypt_phone.split('').reverse().join('');

// DOM elements
const imageContainer = document.getElementById("image-Container");
const questionDetailContainer = document.getElementById("question-detail-Container");
const questionContainer = document.getElementById("question-Container");
const userAnswerContainer = document.getElementById("user-answer-Container");
const correctAnswerContainer = document.getElementById("correct-answer-Container");
const submitButton = document.getElementById("submitButton");

const answerInput = document.getElementById("answerInput");
const radioButtons = document.getElementsByName("score");

// Global variables
var global_unique_id;
var global_question_id;
var global_question_type;
var global_image_based;
var global_image_link;
var global_question;
var global_user_answer;
var global_correct_answer;
var global_question_rating;


var scoreFlag = false;
const val_question_range = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// Display the data
console.log(u_name, u_reg, u_email, u_phone);
console.log(question_type_number);

// Disable the submit button and start a timer with a countdown for x seconds
function disableSubmitButtonForTime(totalSeconds = 60) {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "black";
    let timeLeft = totalSeconds;

    const countdown = setInterval(() => {
        submitButton.innerHTML = `Wait for ${timeLeft}s`;
        timeLeft--;

        // When countdown reaches zero, re-enable the submit button
        if (timeLeft < 0) {
            clearInterval(countdown); // Stop the countdown
            submitButton.disabled = false;
            submitButton.style.backgroundColor = "#ffffff"; // Reset the button color
            submitButton.innerHTML = 'Submit'; // Reset the button text
        }
    }, 1000); // Update every second
}

// Clear the containers
function clearContainers() {
    global_unique_id = undefined;
    global_question_id = undefined;
    global_question_type = undefined;
    global_image_based = undefined;
    global_image_link = undefined;
    global_question = undefined;
    global_user_answer = undefined;
    global_correct_answer = undefined;
    global_question_rating = undefined;

    // clear radio buttons
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }

    imageContainer.innerHTML = "Loading image...";
    questionDetailContainer.innerHTML = "Loading question details...";
    questionContainer.innerHTML = "Loading question...";
    userAnswerContainer.innerHTML = "Loading user answer...";
    correctAnswerContainer.innerHTML = "Loading correct answer...";
    answerInput.value = "";
}

// empty the containers
function emptyContainers() {
    imageContainer.innerHTML = "";
    questionDetailContainer.innerHTML = "";
    questionContainer.innerHTML = "";
    userAnswerContainer.innerHTML = "";
    correctAnswerContainer.innerHTML = "";
    answerInput.value = "";
}

function fetchData() {
    clearContainers();

    // if question_type_number is not valid, then redirect to the login page
    if (question_type_number === "0" || !val_question_range.includes(question_type_number)) {
        alert("Invalid question category. Redirecting to the login page. Please wait!");
        window.location.href = `index.html`;
        return;
    }

    const fetchQuestionData = {
        "access": "AI4A-Lab",
        "question_type_num": question_type_number
    }

    console.log('Fetching Question and Details:', fetchQuestionData);

    fetch(getQuestionAPI, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(fetchQuestionData)
    })
    .then(response => response.json())
    .then(data => {
        // if no question available, then fetch the next question of different category or move to the final page
        if (data.error === "No question available. Contact the administrator.") {
            // no question available, so move to the status page
            alert("No data available. Moving to the current data's status. Please wait!");
            window.location.href = `status.html`;
            return;
        }
        else if (data.error) {      // other types of errors
            alert('Error! ' + data.error);

            // enable the submit button
            submitButton.disabled = false;
            submitButton.innerHTML = "Submit";
            submitButton.style.backgroundColor = "#ffffff";

            fetchData();  // Fetch the next question

            return;
        }

        global_unique_id = data.unique_id;
        global_question_id = data.question_id;
        global_question_type = data.question_type;
        global_image_based = data.image_based;
        global_image_link = data.image_link;
        global_question = data.question;
        global_user_answer = data.user_answer;
        global_correct_answer = data.correct_answer;
        global_question_rating = data.question_rating;

        // empty the containers
        emptyContainers();

        // image_link in format "https://drive.google.com/uc?id="
        if (global_image_based === "yes") {
            imageContainer.innerHTML = `<img src="${global_image_link}" alt="Question Image" class="responsive-image">`;
        } 
        else {
            // use default image provided in the image_link
            imageContainer.innerHTML = `<img src="${global_image_link}" alt="Question Image" class="qa-responsive-image">`;
        }
        questionDetailContainer.style.display = "inline";
        questionDetailContainer.innerHTML = `<span style="font-size: 16px; font-weight:normal;">Question Rating:</span> ${global_question_rating}<span style="font-size: 20px; font-weight:normal;">/5</span><span style="font-size: 16px; font-weight:normal;"> | Question Type: </span>${global_question_type}`;
        questionContainer.innerHTML = `<p style="font-size: 14px;">Question:</p>\n${global_question}`;
        userAnswerContainer.innerHTML = `<p style="font-size: 14px;">User Answer:</p>\n${global_user_answer}`;
        correctAnswerContainer.innerHTML = `<p style="font-size: 14px;">Possible Answer:</p>\n${global_correct_answer}`;

        // Disable the submit button for 30 seconds
        disableSubmitButtonForTime(30);

        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Error fetching text from API:', error);
        alert('Error! ' + error);
    })
    .finally(() => {
        console.log('Data API call done!');
    });
}

function handleSubmit() {
    // radio button selected from the scoreForm
    if (document.querySelector('input[name="score"]:checked') === null) {
        alert("Please score/mark the given answer!");
        disableSubmitButtonForTime(15);
        return;
    }

    var score = document.querySelector('input[name="score"]:checked').value;

    // undefined or empty string
    if (score === undefined || score === "" || !score) {
        alert("Please score/mark the given answer!");
        disableSubmitButtonForTime(15);
        return; 
    }

    if (score === "0" && scoreFlag === false) {
        alert("Are you sure you want to give \"0\" score to the ANSWER?");
        disableSubmitButtonForTime(10);
        scoreFlag = true;
        return;
    }

    if (!val_question_range.includes(score) && score !== "0") {
        alert("Invalid score. Please try again or reload the page!");
        disableSubmitButtonForTime(10);
        return;
    }

    // ----------------------------
    // reasoning/justification for the score
    var scoreReason = answerInput.value;

    // if the scoreReason is empty
    if (scoreReason === undefined || scoreReason === "" || !scoreReason) {
        alert("Please provide a reason/justification for the score!");
        disableSubmitButtonForTime(15);
        return;
    }

    // length of the reasoning/justification
    if (scoreReason.split(' ').length <= 3) {
        alert("Please provide a detailed reason/justification for the score!");
        disableSubmitButtonForTime(15);
        return;
    }

    // ----------------------------
    // if the global_unique_id or global_question_id is missing
    if (global_unique_id === undefined || global_question_id === undefined || global_unique_id === "" || global_question_id === "") {
        // throw an error and exit, if the question_id or unique_id is missing
        alert("Error: Details missing. Please try again or contact the administrator.");
        return;
    }

    // Disable the submit button
    submitButton.disabled = true;
    submitButton.innerHTML = "Updating...";
    submitButton.style.backgroundColor = "black";

    const submitScoreData = {
        "unique_id": global_unique_id,
        "question_id": global_question_id,
        "answer_score": score,
        "grading_rationale": scoreReason
    }

    // Submit the answer
    fetch(submitScoreAPI, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(submitScoreData)
    })
    .then(response => response.json())
    .then(data => {
        // Errors like the field is missing, blocked, etc.
        if (data.error) {
            // reload can get new question or simply submit the answer again
            //alert('Error while submitting answer. ' + data.error);
            console.error("Error submitting score:", data);

            // enable the submit button
            submitButton.disabled = false;
            submitButton.innerHTML = "Submit";
            submitButton.style.backgroundColor = "#ffffff";

            // throw an error and exit
            err = "Error while submitting the score. " + data.error;
            throw new Error(err);
            return;
        }

        console.log("Answer submitted successfully:", data);

        // ----------------------------
        // Database entry

        if (u_name === undefined || u_reg === undefined || u_email === undefined || u_phone === undefined) {
            alert("Error! User details missing. Going back to the login page. Please try again.");

            // move to the login page
            window.location.href = "index.html";

            return;
        }

        const entryData = {
            "unique_id": global_unique_id,
            "question_id": global_question_id,
            "name": u_name,
            "id_reg": u_reg,
            "email": u_email,
            "phone": u_phone,
            "answer_score": score,
            "grading_rationale": scoreReason,
            "question": global_question,
            "user_answer": global_user_answer,
            "question_rating": global_question_rating
        }

        fetch(datasetEntryAPI, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(entryData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Database Entry Successful:", data);
            alert("Score submitted successfully. Moving to the next pair. Please wait!");
        })
        .catch(err => {
            console.error("Error submitting database entry:", err);
            alert("Error! " + err);
        });
        // ----------------------------
        
    })
    .catch(err => {
        alert("Error: " + err);
        console.error("Error submitting answer:", err);
    })
    .finally(() => {
        console.log("Answer submission API call done!");
        scoreFlag = false; // reset the scoreFlag (for score 0)
        // Fetch the next question
        fetchData();
    });
}

// Fetch data when page is loaded
window.onload = fetchData;

document.getElementById("submitButton").addEventListener("click", handleSubmit);

/* Description:
    Author: Farhan Sheth (Phantom-FS)
    Date: 2024-03-01
    LinkedIn: https://www.linkedin.com/in/farhan-sheth
*/