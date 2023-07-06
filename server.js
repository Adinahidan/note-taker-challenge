//dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 3001;

//asks express to create a route for every file in the public folder and use the '/' route.
app.use(express.static("public"));
//sets up express app to handle the parsing data e.g middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//starts the server, also known as an app listener
app.listen(PORT, () => {
  console.log(`Your server is available at http://localhost:${PORT}`);
});