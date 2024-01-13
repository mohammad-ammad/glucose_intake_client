import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavbarComp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const {user} = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('User');
    window.location.href = '/';
  };

  return (
    <nav className="bg-[#0E7490] p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">GLucose</div>

        {/* Responsive Menu Button (Hamburger Icon) */}
        <div className="lg:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links - Responsive */}
        <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="lg:flex lg:space-x-4">
            <Link to="/dashboard" className="text-white hover:text-gray-300">Home</Link>
            {
              user?.role === 'admin' && (
                <Link to="/add-user" className="text-white hover:text-gray-300">Add User</Link>
              )
            }
            <Link to="/glucose" className="text-white hover:text-gray-300">Add Glucose</Link>
            <button onClick={logout} className="text-white hover:text-gray-300">logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComp;
