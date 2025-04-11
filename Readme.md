# Expense Tracker App

A full-stack Expense Tracker web application built using the MERN stack (MongoDB, Express.js, React, Node.js).

---

## 🧾 Features

- Register/Login functionality
- Add, edit, and delete expenses/income
- View transactions in table or chart format
- Filter by date range, type, and frequency
- Responsive UI using Tailwind CSS and Ant Design

---

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS, Ant Design, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Concurrently
- **Authentication:** LocalStorage-based auth
- **Deployment:** [Deployed on Render](https://expense-tracker-system-1.onrender.com)

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- MongoDB Atlas account

---

### 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/sahrajnish/Expense-Tracker-Source-Code.git

cd Expense-Tracker-Source-Code
```
2. Install Backend dependencies
```
npm install
```
3. Install Frontend dependencies
```
cd client

npm install

cd ..
```
4. Setup Environment Variables \
Create a **.env** file in the root directory:
```
PORT=9000
MONGODB_URI=your_mongo_connection_string
```
**NOTE: Donot add DB_NAME after the string and if there is "/" at the last of string then remove it.**

5.  Run the App Locally
```
npm run dev
```

This will run the server and React frontend concurrently.