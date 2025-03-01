# Olabs_25

## Project Description

Olabs_25 is a web-based platform designed to enhance online virtual lab experiences by integrating a class management system with authentication, real-time student performance tracking, and a user-friendly teacher dashboard. This project aims to centralize class administration, provide real-time insights into student performance, and streamline the virtual learning process.

## Features

- **Role-Based Dashboard:** Teachers can add, view, and delete classes.
- **Student Management:** Teachers can add students to a class using their usernames and full names. If a student does not exist, a message is displayed.
- **Authentication & Session Management:** Secure user authentication with persistent session storage in MongoDB.
- **Real-Time Performance Tracking:** Teachers receive insights into student performance and weak areas through an AI-powered review system.
- **Next.js Frontend:** A modern and interactive UI for seamless user experience.

## Installation

Follow these steps to set up the project:

```bash
# Clone the repository
git clone https://github.com/Executioner501/Olabs_25.git
cd Olabs_25

# Set up a virtual environment (for Flask backend)
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables (create a .env file)
# Example:
echo "MONGO_URI='your_mongodb_atlas_connection_string'" > .env
echo "SECRET_KEY='your_secret_key'" >> .env

# Run the Flask backend
flask run

# Navigate to the frontend directory (assuming Next.js frontend)
cd frontend

# Install frontend dependencies
npm install

# Run the Next.js frontend
npm run dev
