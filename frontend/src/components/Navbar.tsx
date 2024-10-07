import React from 'react';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="flex justify-between items-center container mx-auto">
        <h1 className="text-lg font-bold">CREDIT APP</h1>
        {/* Navigation Links */}
        <div className="flex space-x-4 mb-4">
              <Link to="/" className="text-blue-500">Home</Link>
              <Link to="/Dashboard" className="text-blue-500">Dashboard</Link>
              <Link to="/" className="text-blue-500">Budget</Link>
              <Link to="/" className="text-blue-500">Card</Link>
            </div>
      </div>
    </nav>
  );
}

export default Navbar;
