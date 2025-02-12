import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App({}) {
  return (
    <div className="w-svw gap-y-8 overflow-hidden flex flex-col p-5 justify-around items-center dark:bg-[#030712] dark:text-[#d1d5dc]">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
