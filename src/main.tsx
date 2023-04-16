import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import { Router } from "react-chrome-extension-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
