export interface Spinner {
  loading: boolean;
}
export interface ResponseType {
  avatar_url: string;
  bio: string;
  company: string;
  followers: string;
  following: string;
  github_sponsors_url: string;
  interests: string;
  is_onboarded: boolean;
  linkedin_url: string;
  location: string;
  login: string;
  name: string;
  open_issues: string;
  public_gists: string;
  public_repos: string;
  twitter_username: string;
  id: string;
}

export interface HandleFunc {
  handleFunc: () => void;
}

export interface HighlightResponse {
  url: string;
  title: string;
  highlight: string;
}

export interface SessionResponse {
  user_name: string;
  email: string;
  is_onboarded: boolean;
  name: string;
  location: string;
  bio: string;
  twitter_username: string;
  company: string;
  github_sponsors_url: string;
  linkedin_url: string;
}
