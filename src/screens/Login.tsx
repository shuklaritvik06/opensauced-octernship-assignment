import Logo from "../components/Logo.jsx";
import { goTo } from "react-chrome-extension-router";
import Dashboard from "./Dashboard.js";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Modal from "react-responsive-modal";
import Bottom from "../components/Bottom.js";
import { BackendAPIURL } from "../globals/constants.js";

const Login = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  function handleLogin() {
    fetch(`${BackendAPIURL}/login`)
      .then((res) => res.json())
      .then((data) => {
        chrome.storage.sync.set({
          token: {
            authToken: data.token
          }
        });
        toast.success(data.description);
        goTo(Dashboard);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
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
    goTo(Dashboard);
  }
  return (
    <>
      <div className="bg-white w-[400px] h-[500px]">
        <ToastContainer />
        <Logo />
        <div className="flex flex-col mx-3">
          <a href="https://hot.opensauced.pizza" target={"_blank"}>
            <button className="bg-orange-500  p-3 rounded-md text-xl mt-3 border-2 border-[#f4861f] w-full font-extrabold text-white">
              Create Account
            </button>
          </a>
          <button
            className="bg-orange-500 p-3 rounded-md text-xl mt-3 border-2 border-[#f4861f] font-extrabold text-white"
            onClick={() => handleLogin()}
          >
            Login to OpenSauced
          </button>
          <button
            className="bg-orange-500 p-3 rounded-md text-xl mt-3 border-2 border-[#f4861f] font-extrabold text-white"
            onClick={onOpenModal}
          >
            Auth Token
          </button>
        </div>
        <Bottom />
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

export default Login;
