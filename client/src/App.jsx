import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Todos from "./pages/Todos/Todos";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Layout/Navbar";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("todoapp"));
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todolist"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster
        toastOptions={{
          style: {
            background: "#7c3aed",
            color: "#ffffff",
          },
        }}
      />
    </div>
  );
}

export default App;
