# Complaint Management Frontend

This project is a Next.js-based frontend for a role-based complaint management system. It integrates with a Node.js backend to handle user authentication and complaint ticket management using Axios and Ant Design for a modern, responsive UI.


## Sample Login Credentials

You can use these sample credentials to test the application:

### Admin Login
```json
{
  "username": "admin",
  "password": "admin"
}
```

### Customer Login
```json
{
  "username": "remon",
  "password": "remon"
}
```

You can also create new users via the Register as Customer page.

## Features

- **User Authentication**  
  Login and registration pages for customers, with role-based redirection.
- **Role-Based Dashboards**  
  - **Customer Dashboard:** View, create, and delete complaint tickets.  
  - **Admin Dashboard:** View all tickets, update ticket status, and add replies.
- **Ticket Details Page**  
  A detailed view of a ticket with a colorful layout, including admin actions and a list of replies.
- **Global Navigation**  
  A header with Dashboard and Logout options that update automatically based on user authentication state.

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd complaint-management-frontend
2. **Install Dependencies**

   ```bash
   npm install

3. To start the development server, run:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Frontend:** Next.js, Axios, Ant Design
- **Backend:** Node.js, Express, SQLite
- **Authentication:** JWT
- **Styling:** CSS Modules, Ant Design

