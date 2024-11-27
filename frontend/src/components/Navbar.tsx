import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

import { useAuthContext } from "../context/AuthContext";

import * as UsersApi from "../network/users_api";

interface NavbarProps {
  setShowCreateUpdateNoteModal: (bool: boolean) => void;
}

export const Navbar = ({ setShowCreateUpdateNoteModal }: NavbarProps) => {
  const { authUser, setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      await UsersApi.logoutUser();

      setAuthUser(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error message:", error.message);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li
              onClick={() => setShowCreateUpdateNoteModal(true)}
              className="btn"
            >
              <div className="flex justify-center items-center">
                <FaPlus className="text-lg text-white" /> Create a Note
              </div>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          MERN Notes App
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li
            onClick={() => setShowCreateUpdateNoteModal(true)}
            className="btn"
          >
            <div className="flex justify-center items-center">
              <FaPlus className="text-lg text-white" /> Create a Note
            </div>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-2">
        <p>{authUser?.fullname}</p>
        <p onClick={logout} className="btn">
          Logout
        </p>
      </div>
    </div>
  );
};
