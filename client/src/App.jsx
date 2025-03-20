import { useState, useEffect } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { SunIcon, MoonIcon } from "./Icons"; // We'll create this file

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({
    name: "",
    age: "",
    isMarried: false,
  });
  const [selectedUserId, setSelectedUserId] = useState("2");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    // Update theme attribute on body
    if (darkMode) {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
    refetch: refetchUsers,
  } = useQuery(GET_USERS);

  const {
    data: getUserByIdData,
    loading: getUserByIdLoading,
    refetch: refetchUserById,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: selectedUserId },
  });

  const [createUser] = useMutation(CREATE_USER);

  if (getUsersLoading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );

  if (getUsersError)
    return (
      <div className="error-container">Error: {getUsersError.message}</div>
    );

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.age) return;

    await createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: newUser.isMarried || false,
      },
    });

    // Reset form
    setNewUser({ name: "", age: "", isMarried: false });

    // Refetch data
    refetchUsers();
  };

  const handleSelectUser = (id) => {
    setSelectedUserId(id);
    refetchUserById({ id });
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
        <h1>User Management System</h1>
      </header>

      <div className="main-content">
        <div className="card form-card">
          <h2>Create New User</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Enter age"
              value={newUser.age}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, age: e.target.value }))
              }
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={newUser.isMarried}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    isMarried: e.target.checked,
                  }))
                }
              />
              Married
            </label>
          </div>

          <button
            className="primary-button"
            onClick={handleCreateUser}
            disabled={!newUser.name || !newUser.age}
          >
            Create User
          </button>
        </div>

        <div className="card selected-user-card">
          <h2>Selected User</h2>
          {getUserByIdLoading ? (
            <div className="loading-mini">Loading user data...</div>
          ) : getUserByIdData?.getUserById ? (
            <div className="user-profile">
              <div className="avatar">
                {getUserByIdData.getUserById.name.charAt(0)}
              </div>
              <h3>{getUserByIdData.getUserById.name}</h3>
              <div className="user-details">
                <p>
                  <span>Age:</span> {getUserByIdData.getUserById.age}
                </p>
                <p>
                  <span>Status:</span>{" "}
                  {getUserByIdData.getUserById.isMarried ? "Married" : "Single"}
                </p>
              </div>
            </div>
          ) : (
            <p>No user selected</p>
          )}
        </div>
      </div>

      <div className="card users-list-card">
        <h2>All Users</h2>
        <div className="users-grid">
          {getUsersData.getUsers.map((user) => (
            <div
              key={user.id}
              className={`user-card ${
                selectedUserId === user.id ? "selected" : ""
              }`}
              onClick={() => handleSelectUser(user.id)}
            >
              <div className="avatar">{user.name.charAt(0)}</div>
              <h3>{user.name}</h3>
              <p>
                <span>Age:</span> {user.age}
              </p>
              <p>
                <span>Status:</span> {user.isMarried ? "Married" : "Single"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
