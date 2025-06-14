# React Vite Web App with Express Backend

This project is a simple React web application built with Vite and an Express backend.

## Getting Started

Follow the steps below to set up and run the project:

### Frontend Setup

1. Clone the repository and navigate to the project directory.
2. Install the required packages:
    ```bash
    npm i
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

### Backend Setup

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    MONGODB_URI=<your-mongodb-uri>
    DATABASE_NAME=<your-database-name>
    ```
3. Install the required packages:
    ```bash
    npm i
    ```
4. Start the backend server:
    ```bash
    npm run dev
    ```

### Running the Application

1. Ensure both the frontend and backend servers are running.
2. Open your browser and navigate to the URL provided by the Vite development server.

## Notes

- Replace `<your-mongodb-uri>` and `<your-database-name>` in the `.env` file with your actual MongoDB connection details.
- Make sure you have Node.js and npm installed on your system.

Enjoy building with React and Express!  