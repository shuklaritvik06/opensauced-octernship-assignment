import { useEffect, useState } from "react";
import { goTo } from "react-chrome-extension-router";
import { toast, ToastContainer } from "react-toastify";
import Backward from "../components/Backward";
import Logo from "../components/Logo";
import { API_URL } from "../globals/constants";
import Login from "./Login";
import { SessionResponse } from "../types/interfaces";
import SpinnerComponent from "../components/Spinner";
import { CiFaceFrown, CiLocationOn } from "react-icons/ci";
import { GoKey } from "react-icons/go";
import {
  BsBuilding,
  BsGithub,
  BsLinkedin,
  BsMailbox,
  BsTwitter
} from "react-icons/bs";
import Modal from "react-responsive-modal";

const Settings = () => {
  const [searching, setSearching] = useState(true);
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const [data, setData] = useState<SessionResponse>({
    bio: "",
    company: "",
    email: "",
    github_sponsors_url: "",
    is_onboarded: false,
    linkedin_url: "",
    location: "",
    name: "",
    twitter_username: "",
    user_name: ""
  });
  useEffect(() => {
    let token;
    chrome.storage.sync.get(["token"], (result) => {
      token = result.token.authToken;
      fetch(`${API_URL}/auth/session`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.status === 401) {
            goTo(Login);
          }
          return res.json();
        })
        .then((data) => {
          setSearching(false);
          setData(data);
        });
    });
  }, []);
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
  return (
    <>
      <div className="bg-white w-[400px] h-[500px]">
        <ToastContainer />
        <Logo />
        <Backward />
        {searching && (
          <>
            <SpinnerComponent loading={searching} />
          </>
        )}
        {data.user_name.length > 0 ? (
          <>
            <div>
              <div className="flex flex-col gap-2 items-center">
                <div className="flex justify-center mt-3">
                  <img
                    src={`https://github.com/${data?.user_name}.png`}
                    alt="avatar"
                    className="w-28 rounded-full"
                  />
                </div>
                <div className="text-sm font-bold">{data?.name}</div>
                <div>
                  Username:{" "}
                  <span className="text-sm italic font-medium">
                    {data?.user_name}
                  </span>
                </div>
                <div>
                  Bio:{" "}
                  <span className="text-sm italic font-medium">
                    {data?.bio}
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <CiLocationOn size={20} />
                    <span className="text-sm">
                      {data?.location.length > 0 ? data?.location : "Earth"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      <BsBuilding size={18} />
                    </span>
                    <span className="text-sm">
                      {data?.company.length > 0 ? data?.company : "No Org"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BsMailbox />
                  {data?.email}
                </div>
                <div className="flex flex-wrap gap-3 m-3">
                  {data?.github_sponsors_url.length > 0 ? (
                    <a href={data?.github_sponsors_url}>
                      <button className="text-white bg-pink-400 p-2 rounded-md font-bold text-sm">
                        <div className="flex gap-2 items-center">
                          <BsGithub />
                          GitHub Sponsor
                        </div>
                      </button>
                    </a>
                  ) : null}
                  {data?.twitter_username.length > 0 ? (
                    <a href={"https://twitter.com/" + data?.twitter_username}>
                      <button className="text-white bg-blue-400 p-2 rounded-md font-bold text-sm">
                        <div className="flex gap-2 items-center">
                          <BsTwitter />
                          Twitter
                        </div>
                      </button>
                    </a>
                  ) : null}
                  {data?.linkedin_url.length > 0 ? (
                    <a href={data?.linkedin_url}>
                      <button className="text-white bg-blue-900 p-2 rounded-md font-bold text-sm">
                        <div className="flex gap-2 items-center">
                          <BsLinkedin />
                          LinkedIn
                        </div>
                      </button>
                    </a>
                  ) : null}
                  {data?.linkedin_url.length == 0 &&
                    data?.twitter_username.length == 0 &&
                    data?.github_sponsors_url.length == 0 && (
                      <>
                        <button className="text-white bg-red-900 p-2 rounded-md font-bold text-sm">
                          <div className="flex gap-2 items-center">
                            <CiFaceFrown />
                            No Social Url Found!
                          </div>
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div
          className="absolute top-40 right-10 bg-red-500 p-2 rounded-md cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <GoKey size={20} color="white" />
        </div>
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

export default Settings;
