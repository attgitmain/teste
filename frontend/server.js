//simple express server to run frontend production build;
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.get("/politica-de-privacidade", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "politica.html"));
});
app.get("/exclusao-de-dados", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "exclusao.html"));
});
app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(3000);

