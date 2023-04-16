import { useState } from "react";
import Modal from "react-responsive-modal";
import { toast, ToastContainer } from "react-toastify";
import Backward from "../components/Backward";
import Logo from "../components/Logo";
import SearchComponent from "../components/Search";
import { API_URL } from "../globals/constants";
import { HighlightResponse } from "../types/interfaces";
import { FiExternalLink } from "react-icons/fi";
import SpinnerComponent from "../components/Spinner";

const Highlights = () => {
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<HighlightResponse[]>([
    {
      highlight: "",
      title: "",
      url: ""
    }
  ]);
  const onCloseModal = () => setOpen(false);
  function handleAuthToken() {
    const token = document.getElementById("Auth") as HTMLInputElement;
    if (token?.value === "") {
      toast.info("Please give auth token");
      return;
    }
    chrome.storage.sync.set({
      token: {
        authToken: token.value
      }
    });
    setOpen(false);
  }
  function handleClick() {
    const search = document.querySelector("#search") as HTMLInputElement;
    if (search.value === "") {
      toast.info("Please give search query");
      return;
    }
    setSearching(true);
    let token;
    chrome.storage.sync.get(["token"], (result) => {
      token = result.token.authToken;
      fetch(`${API_URL}/users/${search.value}/highlights`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setSearching(false);
          if (data?.statusCode != undefined) {
            toast.error(data?.message);
          }
          setData(data.data);
        })
        .catch((err) => {
          toast.error("Not Found!");
          setSearching(false);
          setOpen(true);
        });
    });
  }
  return (
    <>
      <div className="bg-white w-[400px] h-[500px]">
        <ToastContainer />
        <Logo />
        <Backward />
        <SearchComponent handleFunc={handleClick} />
        {searching && (
          <>
            <SpinnerComponent loading={searching} />
          </>
        )}
        {data[0]?.title.length > 0 ? (
          <>
            {data?.map((item) => {
              return (
                <div
                  className="border-2 border-orange-500 bg-orange-200 rounded-md mx-3 mt-3 p-2"
                  key={Math.random()}
                >
                  <div className="text-base font-bold">{item.title}</div>
                  <div className="text-sm text-gray-800">{item.highlight}</div>
                  <a href={item.url}>
                    <button className="bg-orange-500 text-white font-bold p-2 rounded-md text-sm mt-2">
                      <div className="flex gap-2">
                        <span>
                          <FiExternalLink size={20} />
                        </span>
                        <span>Go To</span>
                      </div>
                    </button>
                  </a>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <p>Auth Token</p>
        <input
          type={"text"}
          className="w-full mt-3 p-2 border rounded-md outline-none"
          id="Auth"
        />
        <button
          className="bg-[#ed5432] mt-3 text-white font-bold p-2 rounded-md"
          onClick={() => handleAuthToken()}
        >
          Authenticate
        </button>
      </Modal>
    </>
  );
};

export default Highlights;
