import { Link } from 'react-router-dom';
import "./style.css"
const Navbar = () => {
  
  return (
    <div>
      <nav className="bg-primary nav-bar">
        <a className="navbar-brand" href="#">Blogs</a>
        <div>
          <div className="nav-links">
            <Link to="/Home" className="nav-link active">Home</Link>
            <Link to="/Login" className="nav-link">Login</Link>
            <Link to="/Register" className="nav-link">Register</Link>
            <Link to="/NewPost" className="nav-link">Post</Link>
            <Link to="/MyPost" className="nav-link">MyPost</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
