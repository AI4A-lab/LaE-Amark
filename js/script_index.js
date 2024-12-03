// JSON object representing the type_array
const typeArray = {
    "1": "Reasoning",
    "2": "Technical",
    "3": "Problem Solving",
    "4": "Critical Analysis",
    "5": "Science",
    "6": "Mathematics",
    "7": "Context-based Question",
    "8": "Aptitude",
    "9": "Behavioral",
    "10": "Emotional Intelligence",
};

// Populate dropdown menu
window.onload = function() {
    const dropdown = document.getElementById('typeDropdown');
    for (const key in typeArray) {
        const option = document.createElement('option');
        //option.value = key; // Set the key as the value
        option.textContent = typeArray[key]; // Set the display text
        dropdown.appendChild(option);
    }
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    var name = document.getElementById("name").value;
    var reg = document.getElementById("reg").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var typeDropdown = document.getElementById('typeDropdown');
    var consentCheckbox = document.getElementById("consentCheckbox").checked;

    // Check if the user has selected a question type
    if (typeDropdown.selectedIndex === 0) {
        alert('Please select a question type.');
        return;
    }

    if (!consentCheckbox) {
        alert('Please agree to the consent form.');
        return;
    }

    var submitButton = document.getElementById("login");
    submitButton.disabled = true; // Disable the submit button

    // change the text of the submit button to "Loading..."
    submitButton.innerHTML = "Loading...";

    // basic data encryption
    var new_name = name.split('').reverse().join('');
    var new_reg = reg.split('').reverse().join('');
    var new_email = email.split('').reverse().join('');
    var new_phone = phone.split('').reverse().join('');

    // get the key of the selected question type
    var typeKey = typeDropdown.selectedIndex;

    console.log(new_name, new_reg, new_email, new_phone, typeKey);

    // transfer to the next page
    window.location.href = `amark.html?name=${new_name}&reg=${new_reg}&email=${new_email}&phone=${new_phone}&type=${typeKey}`;
});

document.getElementById("consentHighlight").addEventListener("click", function() {
    document.getElementById("consentPopup").style.display = "block";
});

document.getElementById("closeConsent").addEventListener("click", function() {
    document.getElementById("consentPopup").style.display = "none";
});

/* Description:
    Author: Farhan Sheth (Phantom-FS)
    Date: 2024-03-01
    LinkedIn: https://www.linkedin.com/in/farhan-sheth
*/