import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import useSystemTheme from "./hooks/useSystemTheme";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  useSystemTheme();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
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
    </Routes>
  );
}

export default App;