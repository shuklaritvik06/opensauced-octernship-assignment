const express = require("express");
const cors = require("cors");
const Router = require("./routes/opensaucedRoutes");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use("/", Router);
app.listen(5000, () => console.log("listening on 5000"));
