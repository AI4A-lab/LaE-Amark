# Amark Website

A web-based platform for evaluating answers.

## Description

Amark is a web-based platform designed for evaluating answers using a scoring system. It is part of a research project conducted by AI4A Lab. The platform allows users to log in, select a question category, and score answers based on predefined criteria. The scores and justifications provided by users are used for academic and research purposes, including the development of AI models.

## Overview

The Amark website consists of several pages, including a login page, an answer marking page, and a status page. Users can log in with their credentials, select a question category, and provide scores and justifications for the scoring. The platform ensures data security and privacy while collecting valuable data for research.

## Features

- **User Authentication**: Secure login system for users.
- **Question Category Selection**: Users can select from various question categories.
- **Multitude of Data**: The platform shows question, student answer, correct answer, question category, and question rating.
- **Answer Marking**: Users can score student answers and provide justifications.
- **Data Encryption**: User data is encrypted for security.
- **Responsive Design**: The website is optimized for various screen sizes.
- **Consent Form**: Users must agree to a consent form before participating.

## Workflow

1. **Login**: Users log in using their name, registration ID, email, and phone number.
2. **Select Category**: Users select a question category from the dropdown menu.
3. **Answer Marking**: Users score the displayed student answer, taking additional data under consideration and provide a justification for the score.
4. **Submit Score**: The score and justification are submitted and stored in the database.
5. **Next Question**: The next question is fetched and displayed for marking.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask)
- **API**: RESTful API
- **Server**: Gunicorn
- **Dataset**: MongoDB (for storing user data and scores)
- **Database**: Google Sheets (for storing user credentials and some data)
- **Hosting**: Heroku

## Files and Directories

- **HTML**: HTML files of the website.
  - `index.html`: The login page.
  - `amark.html`: The answer marking page.
  - `status.html`: The status page displaying remaining questions.
- **css/**: Directory containing CSS files for styling.
  - `styles_index.css`: Styles for the login page.
  - `styles_amark.css`: Styles for the answer marking page.
  - `styles_status.css`: Styles for the status page.
- **js/**: Directory containing JavaScript files for functionality.
  - `script_index.js`: Script for the login page.
  - `script_amark.js`: Script for the answer marking page.
  - `script_status.js`: Script for the status page.

## Important Information

- Users must agree to the consent form before participating in the research.
- This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](./LICENSE) file for more details.
- This website is developed for a research project and is subject to updates and intellectual property rights. For more details contact us via email ([ai4a.lab@outlook.com](mailto:ai4a.lab@outlook.com)).
- The server-side code and API integration details can be made available upon request. Please contact us via email ([ai4a.lab@outlook.com](mailto:ai4a.lab@outlook.com)) for more information.

## Author

- **Farhan Sheth (Phantom-FS)**
- **Date**: 2024-03-01
- **GitHub**: [Phantom-FS](https://github.com/Phantom-fs)
- **LinkedIn**: [Farhan Sheth](https://www.linkedin.com/in/farhan-sheth/)
