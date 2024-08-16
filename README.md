Task Management Application: 

This is a simple Task Management Application built with React and React Bootstrap. The application allows users to manage their to-do tasks, with features like adding, updating, deleting tasks, filtering tasks based on their completion status, and tracking deadlines with a countdown timer.

Features :
User Authentication: The application asks for a username when first accessed and stores it locally. Once set, the user is redirected to their task management dashboard.
Add, Update, and Delete Tasks: Users can add new tasks, mark them as complete or incomplete, and delete tasks.
Task Filtering: Filter tasks based on their completion status (All, Completed, Not Completed).
Pagination: The task list is paginated to show a limited number of tasks per page.
Countdown Timer: Displays the time left until the deadline of each task.
Responsive Design: The application is fully responsive and adapts to different screen sizes.

Technologies Used :
React: A JavaScript library for building user interfaces.
React Bootstrap: A front-end framework for styling and layout.
React Router: Used for routing and navigation between different pages.

Installation :
Clone the repository:
git clone ""
cd task-management-app
Install dependencies:
Make sure you have Node.js installed. Then, run:
npm run dev
Access the application:
Open your browser and navigate to http://localhost:5173 to see the application in action.


Usage:

Initial Setup: When the user first visits the app, they are prompted to enter their name. 

Task Management: After entering the name, users are redirected to their task management dashboard, where they can:

Add new tasks using the "Add New Task" button.
View tasks in a paginated table with task details including title, creation date, deadline, time left, and status.
Update tasks by marking them as complete or incomplete.
Delete tasks if they are no longer needed.
Filter tasks to view all, completed, or not completed tasks.

Future Enhancements:
User Authentication: Implement a backend for user authentication to support multiple users with secure login.
Task Prioritization: Add a feature to prioritize tasks and sort them accordingly.
Notifications: Implement notification alerts for tasks that are nearing their deadline.

Acknowledgements :
Special thanks to the React and React Bootstrap teams for their excellent libraries.