# MarkYourAttendance
Welcome to MarkAttendance! This web application allows users to mark their attendance after logging in, view their previous attendance records, modify attendance times, delete attendance records, and reset their passwords via email verification using OTP (One-Time Password).

## Features
- **User Authentication**: Users can register and log in securely to access the attendance marking system.
- **Mark Attendance**: Once logged in, users can mark their attendance for the current date and time.
- **View Attendance History**: Users can view their previous attendance records to track their attendance over time.
- **Modify Attendance Time**: Users have the option to modify the time of their attendance entries if needed.
- **Delete Attendance**: Users can delete attendance records if they were marked incorrectly or if adjustments are necessary.
- **Password Reset via Email Verification**: Users can reset their passwords by verifying their email using OTP.

## Getting Started
To get started with MarkAttendance, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
   ```
   git clone https://github.com/Subha2901/MarkAttendence.git
   ```
2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.
   ```
   cd MarkAttendence
   npm install
   ```
3. **Set Up the Database**: Configure your MySQL database settings in `config.js` file. You might need to create the necessary tables if they are not created automatically.
4. **Start the Server**: Start the server to run the application locally.
   ```
   npm start
   ```
5. **Access the Application**: Once the server is running, access the application in your web browser at `http://localhost:3000`.

## Usage
1. **Register/Login**: If you're a new user, register for an account. If you're an existing user, log in using your credentials.
2. **Mark Attendance**: After logging in, navigate to the attendance section where you can mark your attendance for the current date and time.
3. **View Attendance History**: You can view your previous attendance records to track your attendance over time. 
4. **Modify Attendance Time**: If you need to adjust the time of your attendance entry, you have the option to modify it.
5. **Delete Attendance**: If you made a mistake while marking attendance or need to remove an entry, you can delete the attendance record.
6. **Password Reset**: If you forget your password, you can reset it by verifying your email using OTP.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Email Verification**: Nodemailer for sending OTP emails

## Contributors
- Subha2901 (@Subha2901)
