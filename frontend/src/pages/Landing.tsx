import { Link } from "react-router-dom";
import { UnauthNavbar } from "../components/UnauthNavbar";

const Landing = () => {
  return (
    <div className="w-screen h-screen">
      <UnauthNavbar />

      <div className="w-full h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-semibold">
          Welcome to the MERN Notes App!
        </h1>

        <p className="text-lg">
          Start your journey by{" "}
          <Link to="/login" className="font-bold hover:text-white">
            logging
          </Link>{" "}
          in or{" "}
          <Link to="/register" className="font-bold hover:text-white">
            registering
          </Link>{" "}
          an account.
        </p>
      </div>
    </div>
  );
};
export default Landing;
