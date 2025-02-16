import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Error from "./pages/Error";
import Ceaser from "./pages/Ceaser";
import Monoalphabetic from "./pages/Monoalphabetic";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Ceaser />} />
      <Route path="monoalphabetic" element={<Monoalphabetic />} />
      <Route path="palyfair" element={<Monoalphabetic />} />
      <Route path="hillciphering" element={<Monoalphabetic />} />
      <Route path="polyalphabetic" element={<Monoalphabetic />} />
    </Route>
  ),
  {
    basename: "/",
    future: {},
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
