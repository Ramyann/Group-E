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
        HillCiphering
      </Link>

      <Link
        to="/Polyalphabetic"
        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
      >
        Polyalphabetic
      </Link>

      <button
        className="cursor-pointer font-bold bg-red-500 p-2 rounded-sm text-white"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
