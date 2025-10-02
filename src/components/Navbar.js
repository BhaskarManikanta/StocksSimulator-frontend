import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  return (
    <div className="navbar">
      <h3>Welcome, {user?.email}</h3>
    </div>
  );
};

export default Navbar;
