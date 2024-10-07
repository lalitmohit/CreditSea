

---

# Loan Management System - CreditSea

This project is a Loan Management System developed for **CreditSea**. It consists of three roles: **User**, **Verifier**, and **Admin**. The system allows users to apply for loans, verifiers to verify loan applications, and admins to manage the approval, rejection, and resetting of loan statuses.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Roles and Responsibilities](#roles-and-responsibilities)
3. [Tech Stack](#tech-stack)
4. [Features](#features)
5. [API Endpoints](#api-endpoints)
6. [Installation](#installation)
7. [Usage](#usage)
8. [CORS Configuration](#cors-configuration)
9. [Error Handling](#error-handling)
10. [Acknowledgements](#acknowledgements)

---

## Project Overview

The Loan Management System aims to streamline the loan approval process. Users can apply for loans, verifiers can validate the requests, and admins oversee the final decision on whether the loan should be approved or rejected. The system provides real-time updates on loan statuses and allows different access based on roles.

---

## Roles and Responsibilities

1. **User**
   - Applies for a loan with necessary details such as loan amount, reason for loan, employment status, etc.
   - Can track the status of their loan application (PENDING, VERIFIED, APPROVED, REJECTED).

2. **Verifier**
   - Reviews loan applications submitted by users.
   - Changes the status of the loan to VERIFIED if approved or REJECTED if found invalid.

3. **Admin**
   - Final decision-maker for loan applications.
   - Can approve or reject loans and reset loan statuses.
   - Handles loans in both PENDING and APPROVED states.

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Others:** TypeScript, Mongoose

---

## Features

1. **User Application:**
   - Users can submit loan requests through a form.
   - The status of the loan is updated based on verifier/admin actions.
   
2. **Verifier Actions:**
   - Verifiers review submitted loans and either verify or reject them based on their findings.
   - Loans not marked "APPROVED" are shown to verifiers for verification.
   
3. **Admin Controls:**
   - Admins can view both VERIFIED, APPROVED AND REJECTED loans.
   - Approve or reject the loans.
   - Reset loan statuses when necessary.

---

## API Endpoints

### **Loan Operations**
- **Create a New Loan**
  - Method: `POST`
  - URL: `/loans`
  - Description: Allows a user to submit a new loan application.

- **Get Loan Applications by Status**
  - Method: `GET`
  - URL: `/loans`
  - Description: Fetch loan applications based on the role (admin or verifier) and loan status.

- **Update Loan Status**
  - Method: `PATCH`
  - URL: `/loans/status`
  - Description: Verifier/Admin can update the loan status.

- **Get Total Active Users**
  - Method: `GET`
  - URL: `/loans/active-users`
  - Description: Get the total number of distinct users who have applied for a loan.

- **Get Approved Loans Count**
  - Method: `GET`
  - URL: `/loans/loans-count`
  - Description: Fetch the total number of loans with status "APPROVED".

- **Get Total Disbursed Loan Amount**
  - Method: `GET`
  - URL: `/loans/total-disbursed-loanAmount`
  - Description: Get the total sum of loans where the status is "APPROVED".
 
- **Get Summary**
  - Method: `GET`
  - URL: `/loans/summary`
  - Description: Get the summary of loans, activeUsers, totaldisbursedamount and all".

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   cd backend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file and set up the MongoDB URI.

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

5. **Start the frontend server:**
   - Navigate to the frontend directory and run the React app:
     ```bash
     cd ..
     cd frontend
     npm start
     ```

---

## Usage

- Users can access the loan application form, submit a loan request, and view the status of their application.
- Verifiers can review loans where the status is not "APPROVED".
- Admins can approve or reject loans and also view loans that are verified, rejected or approved.

---

## CORS Configuration

To ensure smooth interaction between the frontend and backend, we configured CORS:
```js
const corsOptions = {
  origin: 'https://credit-sea-flax.vercel.app', // Frontend link
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
```
Make sure to update the origin based on your frontend deployment URL.

---

## Error Handling

For error handling, we are using a centralized error handler to manage both client-side and server-side errors:
```js
const errorHandler = (res, statusCode, message, details = null) => {
  res.status(statusCode).json({ error: message, details });
};
```

---

## Note
   - If API is not giving reponse to frontend plz try to reload as it's Vercel Issue ( Where we deployed it ).
   - Active Users => Total Number of Users who have applied for the loan.
   - Borrowers => Total Number of Users who got atleast one loan.
   - Loans => Total number of loans applied by all users.
   - TotalCaseDisbursed => Total amount of approved loans.
     
   



## Acknowledgements

- Thanks to [CreditSea](https://creditsea.com) for providing the opportunity to work on this project.

---
