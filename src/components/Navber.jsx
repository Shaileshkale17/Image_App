import React, { useState, useRef, useEffect } from "react";
import userImage from "../assets/nasa-hubble-space-telescope-ZkDH_u3y2pk-unsplash.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [name, setName] = useState("Shailesh Kale");
  const [email, setEmail] = useState("Shaileshkale88730@gmail.com");
  const dropdownRef = useRef(null);
  const userProfileRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userProfileRef.current &&
        !userProfileRef.current.contains(event.target)
      ) {
        setShowUserProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-12 py-3 bg-black relative">
      <Link to="/" className="text-white text-xl font-bold">
        Logo
      </Link>

      <ul className="flex flex-row items-center gap-6">
        {/* User Profile */}
        <li className="relative" ref={userProfileRef}>
          <img
            src={userImage}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer border border-solid border-white"
            onClick={() => setShowUserProfile(!showUserProfile)}
            role="button"
            aria-label="Toggle User Profile Dropdown"
          />
          {showUserProfile && (
            <div
              className="absolute top-full right-0 mt-2 w-64 bg-black rounded-md shadow-md text-center p-4 z-50"
              ref={dropdownRef}>
              <h3 className="text-white text-lg font-medium mb-4">
                {name || "User Name"}
              </h3>

              <p className="text-white font-medium mb-4 text-sm">
                {email || "User Email"}
              </p>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
