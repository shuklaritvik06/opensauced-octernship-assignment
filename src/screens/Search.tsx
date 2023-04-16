import { useState } from "react";
import Backward from "../components/Backward";
import Logo from "../components/Logo";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../globals/constants";
import SpinnerComponent from "../components/Spinner";
import Modal from "react-responsive-modal";
import { ResponseType } from "../types/interfaces";
import { CiFaceFrown, CiFaceSmile, CiLocationOn } from "react-icons/ci";
import { BsBuilding, BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import SearchComponent from "../components/Search";

const Search = () => {
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<ResponseType>({
    avatar_url: "",
    bio: "",
    company: "",
    followers: "",
    following: "",
    github_sponsors_url: "",
    interests: "",
    location: "",
    name: "",
    twitter_username: "",
    is_onboarded: false,
    linkedin_url: "",
    login: "",
    open_issues: "",
    public_gists: "",
    public_repos: "",
    id: ""
  });
  const onCloseModal = () => setOpen(false);
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
      fetch(`${API_URL}/users/${search.value}`, {
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
          setData(data);
        })
        .catch((err) => {
          toast.error("Not Found!");
          setSearching(false);
          setOpen(true);
        });
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
    setOpen(false);
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
        {data?.id?.length > 0 && (
          <div className="m-3">
            <div className="w-full h-[250px] rounded-md border-2 border-orange-500 bg-orange-200">
              <div className="flex justify-between items-center">
                <div className="w-20 m-3">
                  <img
                    src={
                      data?.avatar_url.length > 0
                        ? data?.avatar_url
                        : "src/assets/placeholder.jpg"
                    }
                    alt=""
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="text-lg">
                    {data?.name.length > 0 ? data?.name : "OpenSauced User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.bio.length > 0 ? data?.bio : "I love Pizza 🍕"}
                  </p>
                </div>
                <div className="mx-2">
                  <button
                    className={
                      data.is_onboarded
                        ? "bg-[#06631f] text-[#ffffff] font-bold p-1 rounded-md"
                        : "bg-[#a33d3a] text-[#ffffff] font-bold  p-1 rounded-md"
                    }
                  >
                    {data.is_onboarded ? "Onboarded" : "Not Onboarded"}
                  </button>
                </div>
              </div>
              <div className="flex mt-1 mr-3 gap-3 mx-2">
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
              <div className="flex mt-2 mx-1">
                <p className="text-sm ml-2">
                  Followers:{" "}
                  <span className="font-bold">{data?.followers}</span>
                </p>
                <p className="text-sm ml-2">
                  Following:{" "}
                  <span className="font-bold">{data?.following}</span>
                </p>
              </div>
              <div></div>
              <div className="flex items-center">
                <span className="text-sm m-3">Interests: </span>
                <div className="uppercase font-bold overflow-x-clip">
                  {data?.interests.length > 0
                    ? data?.interests.split(",").splice(0, 3).join(",")
                    : "No interests specified"}
                </div>
              </div>
              <div className="flex gap-3 m-3">
                {data?.github_sponsors_url.length > 0 ? (
                  <a href={data?.github_sponsors_url}>
                    <button className="text-white bg-pink-400 p-2 rounded-md font-bold text-sm">
                      <div className="flex gap-2 items-center">
                        <BsGithub />
                        GitHub
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
        )}
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

export default Search;
