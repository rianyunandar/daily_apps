// components/MobileLayout.js
import React from "react";
import Link from "next/link";
import { FaUser, FaBell, FaSignOutAlt } from "react-icons/fa"; // Import icons as needed
import { useAuth } from "@/auth/auth";

const MobileLayout = () => {
  const { token, logout } = useAuth();
  return (
    <div className="flex items-center">
      <div className="text-center flex-grow">
        <Link href="/">
          <span className="text-sm font-bold">
            Sanber.
            <strong className="font-bold text-red-700"> Daily Apps. </strong>
          </span>
        </Link>
      </div>

      {token && (
        <div className="ml-4 flex items-center space-x-4">
          {/* Profile Icon */}
          <Link href="/profile">
            <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
              <FaUser className="text-xl" />
            </span>
          </Link>

          {/* Notifications Icon */}
          <Link href="/notifications">
            <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
              <FaBell className="text-xl" />
            </span>
          </Link>

          {/* Logout Icon */}
          <button onClick={logout}>
            <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
              <FaSignOutAlt className="text-xl" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileLayout;
