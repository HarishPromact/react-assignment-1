import { NavLink } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

function HeaderComponent() {
  // State to track the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Render the component
  return (
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          {/* Logo */}
          <div className="header__logo">EMS</div>
          {/* Menu Links */}
          <ul className={`header__nav-links ${isMenuOpen ? "header__nav-links--show" : ""}`}>
            <li className="header__nav-item">
              {/* Link to Employee List */}
              <NavLink to="/list" className={({ isActive }) => (isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link')}>
                Employee List
              </NavLink>
            </li>
            <li className="header__nav-item">
              {/* Link to Add Employee */}
              <NavLink to="/add" className= {({ isActive}) => (isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link')}>
                Add Employee
              </NavLink>
            </li>
          </ul>
          {/* Menu Icon */}
          <div className="header__menu-icon" onClick={toggleMenu}>
            &#9776;
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeaderComponent;
