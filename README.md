<h1>Shared Expense Tracker</h1>
<h2>Introduction</h2>
<br>

Hi all, welcome to my first full-stack project! I have created this mobile app to provide a more dynamic approach to tracking expenses. This app allows couples to collaboratively track their expenses together within the same expense account across different devices. Additionally, users can create individual or shared accounts, consolidating all their expenses in one place. Currently, this is a Minimal Viable Product (MVP), and features such as statistics, OTP, and logging are still under development.

<h2>Setup</h2>
<br>

To setup the app locally, below are the steps and details:
**Setup PostgreSQL Database**

1. Install PostgreSQL on local computer
2. Open the sqltables folder
3. Using Windows Powershell, create_db.ps1

**Springboot API**

1. Open the backend folder
2. Install maven dependencies using pom.xml

**React Native (Expo)**

1. Install node.js
2. Open the frontend folder
3. In command line, run:
   npm install
   npx expo start --tunnel
4. Upon launching app, a dummy account is available for login with details:
   email: justinlee97@hotmail.com
   password: password

<h2>Screens</h2>

<div style="display: flex;">
   <h3>Login and Sign up Screens</h3>
   <br>
  <img src="https://github.com/user-attachments/assets/33af02da-c754-482a-b843-a4acf2d9333a" alt="Login" width="300" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/1c9de369-a1cf-4dac-90dd-a3e3931de851" alt="Sign up" width="300"/>
</div>

<div style="display: flex;">
   <h3>Accounts</h3>
   <br>
  <img src="https://github.com/user-attachments/assets/4184569c-a473-448a-89ee-4f17d4e9bdc9" alt="Accounts" width="300" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/718248ff-49e3-40d3-8839-3759326a57ea" alt="Add account" width="300"/>
</div>

<div style="display: flex;">
   <h3>Expenses</h3>
   <br>
  <img src="https://github.com/user-attachments/assets/fdaa24e0-2efa-4595-a754-3f3f26f1f9a6" alt="Expenses" width="300" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/4818b850-760b-4dd2-9e2b-a6711b01aa1f" alt="Expense Date" width="300"/>
   <img src="https://github.com/user-attachments/assets/39c528f1-5701-431f-bd32-9ada608fdf2b" alt="Expense August" width="300"/>
   <img src="https://github.com/user-attachments/assets/3debbd5a-3475-4c45-80a9-38b4baf61458" alt="Add Expense" width="300"/>
   <img src="https://github.com/user-attachments/assets/ee7c5989-156c-452a-8527-dfc58b18eebc" alt="Edit Expense" width="300"/>
   <img src="https://github.com/user-attachments/assets/367c3ade-7efa-4375-ad92-1aa80d202b27" alt="Delete Expense" width="300"/>
</div>

<div style="display: flex;">
   <h3>Users</h3>
   <br>
  <img src="https://github.com/user-attachments/assets/2fc66582-2515-4c4a-a64b-0b8b038d9a59" alt="Users" width="300" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/75d212dc-c989-48aa-9e8d-e0eb535e4651" alt="Add user" width="300"/>
</div>
