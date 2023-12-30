# Quiz App
#### Video Demo:  [Click here!](https://youtu.be/bZMSdZIVJeo)


#### Description:
The Quiz App is a web application designed for creating and managing quizzes. The project utilizes a React.js frontend for the user interface and a Flask backend to handle data storage and retrieval.

## Features
- **User-friendly Interface:** The frontend provides an intuitive and responsive interface for users to interact with quizzes.
- **Quiz Creation:** Users can create quizzes by specifying the category, difficulty level, questions, and multiple-choice answers.
- **Backend Integration:** The Flask backend handles the storage of quiz data, ensuring a seamless experience for users.

## Project Structure
- **frontend:** Contains all files related to the React.js frontend.
  - *Components:* Various React components used to build the user interface.
  - *Pages:* Different pages such as quiz creation, quiz menu and quiz interface.
- **backend:** Contains the Flask backend code.
  - *app.py:* The main Flask application file is setting up an API endpoint to allow frontend data requests.
  - *quiz.db:* Defines the database models and relationships and stores quiz data. The database is build up of 3 linked tables (categories -> questions -> answers).

## How to Run
1. Clone the repository: `git clone https://github.com/lucahuerse/quiz-app`
2. Navigate to the project folder: `cd quiz-app`
3. Install dependencies for both frontend and backend: `npm install` (for frontend) and `pip install -r requirements.txt` (for backend).
4. Run the application:
   - Start the backend server: `flask run`
   - Start the frontend: `npm start`

## Design Choices
- **React.js:** Chosen for its component-based architecture, making it easier to manage and scale the frontend.
- **Flask:** Selected as the backend framework due to its simplicity and compatibility with Python.
- **shadcn.ui** Used for beautifully designed React components for a user-friendly user interface.

## Future Improvements
- Implement user authentication for personalized quiz creation and tracking.
- Add additional quiz customization options such as text answers or multi-answer questions.
- Add filter options to quiz menu to sort and filter quizzes.

Feel free to explore the codebase and contribute to the project! If you have any questions or suggestions, please open an issue or reach out to the project maintainers.
