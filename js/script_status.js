status_api = "https://llm-evaluators-ans-6abe2bd02f24.herokuapp.com/remaining_questions";

const totalQuestions = document.getElementById('total-questions');
const categoriesContainer = document.getElementById('categories');

// clear the Containers
function addToContainers() {
    totalQuestions.innerText = 'Loading...';
    categoriesContainer.innerHTML = 'Loading...';
}

// clear the Containers
function clearContainers() {
    totalQuestions.innerText = '';
    categoriesContainer.innerHTML = '';
}

// Fetch the data from the API
function fetchData() {
    
    // data fetching
    fetch(status_api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        // error handling
        if (data.error) {
            alert(data.error);
            return;
        }

        console.log(data);

        // Clear the containers
        clearContainers();

        // Populate the data
        totalQuestions.innerText = data.overall_remaining_questions;

        const categories = data.remaining_questions;

        for (const [category, count] of Object.entries(categories)) {
            const cardItem = document.createElement('div');
            cardItem.className = 'card-item';
            cardItem.innerHTML = `<strong>${category}</strong><br>${count} Questions`;
            categoriesContainer.appendChild(cardItem);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// on page load
window.onload = function() {
    addToContainers();
    fetchData();
};

/* Description:
    Author: Farhan Sheth (Phantom-FS)
    Date: 2024-03-01
    LinkedIn: https://www.linkedin.com/in/farhan-sheth
*/