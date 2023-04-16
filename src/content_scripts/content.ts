import {
  API_URL,
  ViewButton,
  OpenSaucedURL,
  InviteButton,
  BackendAPIURL,
  TweetUrl,
  UpVoteButton
} from "../globals/constants";
import "../globals/style.css";

function checkIfUserExist() {
  const username = window.location.pathname.split("/")[1];
  fetch(`${API_URL}/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      const profileArea = document.querySelector(
        "div.js-profile-editable-area"
      );
      if (data?.statusCode === undefined) {
        const element = `<a href="${OpenSaucedURL}/user/${data?.login}">${ViewButton}</a>`;
        profileArea?.insertAdjacentHTML("beforebegin", element);
      } else {
        const element = `${InviteButton}`;
        profileArea?.insertAdjacentHTML("beforebegin", element);
        const invite = document.querySelector("#invite");
        const emailSelector = document.querySelector('li[itemprop="email"] a');
        const twitterSelector = document.querySelector(
          'li[itemprop="social"] a'
        );
        invite?.addEventListener("click", () => {
          if (
            emailSelector?.textContent !== "" &&
            emailSelector?.textContent !== undefined
          ) {
            fetch(`${BackendAPIURL}/email`, {
              method: "POST",
              body: JSON.stringify({
                email: emailSelector?.textContent
              })
            });
          }
          if (
            twitterSelector?.textContent !== "" &&
            twitterSelector?.textContent !== undefined
          ) {
            window.location.href =
              TweetUrl +
              `Hey ${twitterSelector?.textContent} 👋 I want to invite you to OpenSauced. An Awesome Org for Open Source Folks. Join at ${OpenSaucedURL}`;
          }
        });
      }
    })
    .catch((err) => {});
}
function checkAndVote() {
  chrome.storage.sync.get(["token"], (result) => {
    let token = result.token.authToken;
    try {
      if (window.location.href.split("/").length === 5) {
        const owner = document.querySelector('span[itemprop="author"] a')
          ?.textContent as string;
        const repo = document.querySelector('strong[itemprop="name"] a')
          ?.textContent as string;
        if (owner !== "" && repo !== "") {
          fetch(`${API_URL}/repos/${owner?.trim()}/${repo?.trim()}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then((response) => response.json())
            .then((data) => {
              if (data?.statusCode === undefined) {
                const element = `${UpVoteButton}`;
                const starContainer = document.querySelector(
                  "ul.pagehead-actions"
                );
                starContainer?.insertAdjacentHTML("afterend", element);
                document
                  .querySelector("#upvote")
                  ?.addEventListener("click", () =>
                    clickToVote(owner.trim(), repo.trim(), token)
                  );
              }
            });
        }
      }
    } catch (err) {
      return;
    }
  });
}

function clickToVote(owner: string, repo: string, token: string) {
  try {
    fetch(`${API_URL}/repos/${owner}/${repo}/vote`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.statusCode === undefined) {
          const element = document.querySelector("#upvote")!;
          element.textContent = "Upvoted";
          element.classList.add("bg-yellow-500");
        } else {
          alert(data.message);
        }
      });
  } catch (err) {}
}
checkIfUserExist();
checkAndVote();
