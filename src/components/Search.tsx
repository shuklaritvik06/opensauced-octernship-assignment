import { HandleFunc } from "../types/interfaces";

const SearchComponent = ({ handleFunc }: HandleFunc) => {
  return (
    <div className="mx-3 mt-3">
      <input
        type={"text"}
        className="p-2 text-base border outline-none rounded-md"
        id="search"
        autoComplete="off"
      />
      <button
        className="bg-orange-500 px-2 py-1 rounded-md text-xl mt-3 border-2 ml-2 border-[#f4861f] text-white focus:ring-1 focus:ring-[#f4861f]"
        onClick={() => handleFunc()}
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
