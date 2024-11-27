import { Link } from "react-router-dom";

export const UnauthNavbar = () => {
  return (
    <div className="navbar bg-base-200 flex justify-center items-center">
      <Link to="/landing" className="btn btn-ghost text-xl">
        MERN Notes App
      </Link>

      <div className="h-[64px] absolute top-0 right-0 flex justify-center items-center gap-4">
        <Link to="/login" className="btn btn-ghost text-lg">
          Login
        </Link>
        <Link to="/register" className="btn btn-ghost text-lg">
          Register
        </Link>
      </div>
    </div>
  );
};
