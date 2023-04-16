import { goTo } from "react-chrome-extension-router";
import Bottom from "../components/Bottom";
import Logo from "../components/Logo";
import Highlights from "./Highlights";
import Search from "./Search";
import Settings from "./Settings";

const Dashboard = () => {
  return (
    <div className="bg-white w-[400px] h-[500px]">
      <Logo />
      <div className="flex flex-col mx-3">
        <button
          className="bg-orange-500  p-3 rounded-md text-xl mt-3 border-2 border-[#f4861f] w-full font-extrabold text-white"
          onClick={() => goTo(Search)}
        >
          Search User
        </button>
        <button
          className="bg-orange-500 p-3 rounded-md text-xl mt-3 border-2 border-[#f4861f] font-extrabold text-white"
          onClick={() => goTo(Highlights)}
        >
          Highlights
        </button>
        <button
          className="bg-orange-500 p-3 rounded-md text-xl mt-3 border-2 border-[#f4861f] font-extrabold text-white"
          onClick={() => goTo(Settings)}
        >
          Settings
        </button>
      </div>
      <Bottom />
    </div>
  );
};

export default Dashboard;
