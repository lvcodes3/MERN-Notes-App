import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const App = () => {
  const { authUser, isLoading } = useAuthContext();

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (authUser) {
      return <>{children}</>;
    } else {
      return <Navigate to="/landing" />;
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/landing"
          element={!authUser ? <Landing /> : <Navigate to="/" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
