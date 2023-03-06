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

// Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// chaining route handlers

const firstRoute = (request, response, next) => {
  console.log("First Route");
  next();
};

const secondRoute = (request, response, next) => {
  console.log("Second Route");
  next();
};

const thirdRoute = (request, response) => {
  console.log("Third Route");
  response.send("All Routes Completed Successfully");
};

app.get("/chainThem(.html)?", [firstRoute, secondRoute, thirdRoute]);

app.get("/*", (request, response) => {
  response.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
