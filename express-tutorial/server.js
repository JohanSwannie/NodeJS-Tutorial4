const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get("^/$|index(.html)?", (request, response) => {
  // response.sendFile("./views/index.html", { root: __dirname });
  response.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (request, response) => {
  response.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (request, response) => {
  response.redirect(301, "/new-page.html");
});

app.get("/*", (request, response) => {
  response.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
