import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App({}) {
  return (
    <div className="w-svw h-svh background gap-y-8 overflow-hidden flex flex-col p-5 items-center">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
