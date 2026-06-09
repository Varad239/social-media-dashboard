import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Social Dashboard</h2>

      <div>
        <Link to="/">
          Dashboard
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;