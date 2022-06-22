import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import useAuth from "./hooks/useAuth";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

const App = () => {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* need to protect */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route
            path="/dashboard"
            element={!auth ? <Navigate to="/" replace={true} /> : <Dashboard />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
