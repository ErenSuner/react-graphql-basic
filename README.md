# User Management System

A basic full-stack application demonstrating a user management system built with React and GraphQL.

## 📋 Overview

This application provides a simple interface to create and view user profiles. It demonstrates how to connect a React frontend with a GraphQL API backend, offering features like:

- Creating new user profiles
- Viewing all users in a grid layout
- Viewing selected user details
- Dark/light theme switching with persistent preferences

![UI Design Preview](https://imgur.com/a/TD0DTtu)

## 🚀 Technologies Used

### Frontend
- **React 19** - Latest version of the React library
- **Vite** - Fast modern build tool
- **Apollo Client** - GraphQL client for React
- **CSS** - Custom styling with CSS variables for theming

### Backend
- **Apollo Server** - GraphQL server
- **Node.js** - JavaScript runtime

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/user-management-system.git
cd user-management-system
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

1. Start the GraphQL server:
```bash
cd server
npm run dev
```
The server will start on http://localhost:4000

2. Start the React client:
```bash
cd client
npm run dev
```
The client will start on http://localhost:5173 (or another port if 5173 is in use)

3. Open your browser and navigate to the client URL (http://localhost:5173)

## 🧩 Features

### User Management
- Create new users with name, age, and marital status
- View a complete list of users
- Select and view detailed information about a specific user

### Theme Switching
- Toggle between light and dark themes
- Automatic theme detection based on system preferences
- Theme persistence through local storage

## 📁 Project Structure

```
/
├── client/                 # Frontend React application
│   ├── src/                # Source files
│   │   ├── App.jsx         # Main application component
│   │   ├── App.css         # Application styling
│   │   ├── Icons.jsx       # Icon components
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   └── package.json        # Frontend dependencies
│
└── server/                 # Backend GraphQL server
    ├── server.js           # Server configuration
    └── package.json        # Backend dependencies
```

## 🔄 API Schema

### Types
```graphql
type User {
  id: ID
  name: String
  age: Int
  isMarried: Boolean
}
```

### Queries
```graphql
getUsers: [User]             # Get all users
getUserById(id: ID!): User   # Get a specific user by ID
```

### Mutations
```graphql
createUser(name: String!, age: Int!, isMarried: Boolean!): User   # Create a new user
```

## 🧪 Development

### Client-side
- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

### Server-side
- Run development server with auto-reload: `npm run dev`

## 📚 Future Improvements

- User deletion and editing functionality
- Form validation
- Pagination for users list
- Filtering and sorting options
- User authentication
- Persistent storage with a database

## 📄 License

[MIT License](LICENSE)
