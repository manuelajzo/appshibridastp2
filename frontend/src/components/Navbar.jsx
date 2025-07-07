import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">The Sims Database</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/games">All Sims Games</Link></li>
        <li><Link to="/dlcs">All DLCs</Link></li>
      </ul>
      <div className="auth-buttons">
        {!user ? (
          <>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
          </>
        ) : (
          <>
            <span>Hi, {user?.username || "User"}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
