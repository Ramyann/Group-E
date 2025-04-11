import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { logoutUser } from "../../context/slices/userSlice";

const Navbar = ({}) => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-white flex gap-x-12 shadow-md w-[70%] rounded-lg mx-auto px-16 py-3">
      <Link
        to="/"
        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        Ceaser
      </Link>

      <Link
        to="/Monoalphabetic"
        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        Monoalphabetic
      </Link>

      <Link
        to="/Playfair"
        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        Playfair
      </Link>

      <Link
        to="/HillCiphering"
        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        Hill
      </Link>

      <Link
        to="/Polyalphabetic"
        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        Polyalphabetic
      </Link>

      <Link
        to="/DES"
        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        DES
      </Link>

      <Link
        to="/Brute-force"
        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        Brute Forces
      </Link>

      <button
        className="cursor-pointer font-bold bg-red-500 p-4 rounded-sm text-white fixed right-20 top-6"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
