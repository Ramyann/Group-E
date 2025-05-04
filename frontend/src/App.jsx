import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "./pages/Error";
import Ceaser from "./pages/Ceaser";
import Monoalphabetic from "./pages/Monoalphabetic";
import { logoutUser } from "./context/slices/userSlice.js";
import Layout from "./Layout.jsx";
import Login from "./pages/Login";
import Playfair from "./pages/Playfair/Playfair.jsx";
import HillCiphering from "./pages/HillCiphering/HillCiphering";
import Bruteforces from './pages/Bruteforces'
import DES from "./pages/DES/DES.jsx";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.expiresAt) {
      const timeLeft = user.expiresAt - new Date().getTime();

      if (timeLeft > 0) {
        const timeout = setTimeout(() => {
          dispatch(logoutUser());
        }, timeLeft);

        return () => clearTimeout(timeout);
      } else {
        dispatch(logoutUser());
      }
    }
  }, [user, dispatch]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      user ? (
        <Route
          path="/"
          element={user ? <Layout /> : <Login />}
          errorElement={<Error />}
        >
          <Route index element={<Ceaser />} />
          <Route path="monoalphabetic" element={<Monoalphabetic />} />
          <Route path="playfair" element={<Playfair />} />
          <Route path="hillciphering" element={<HillCiphering />} />
          <Route path="polyalphabetic" element={<Monoalphabetic />} />
          <Route path="Brute-force" element={<Bruteforces />} />
          <Route path="Des" element={<DES />} />

        </Route>
      ) : (
        <Route path="*" element={<Login />} />
      )
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
