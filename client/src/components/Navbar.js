import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="bg-white p-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div>
          <Link to="/">
            <img
              className="mx-auto h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </Link>
        </div>
        <div className="flex gap-4">
          {!auth.user ? (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span>{auth.user.name}</span>
              <span className="cursor-pointer" onClick={handleLogout}>
                Logout
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
