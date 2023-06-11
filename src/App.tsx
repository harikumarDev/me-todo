import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./contexts/userContext";
import TodoProvider from "./contexts/TodoContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Dashboard, Login, Signup } from "./components";

function App() {
  return (
    <UserProvider>
      <TodoProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

          <ToastContainer />
        </Router>
      </TodoProvider>
    </UserProvider>
  );
}

export default App;
