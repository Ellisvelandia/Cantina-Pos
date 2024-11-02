import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsVerifying(false);
        return;
      }

      try {
        await api.get("/auth/verify");
        setIsValid(true);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, []);

  if (isVerifying) {
    return <div>Loading...</div>; // Puedes reemplazar esto con un componente de loading
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
