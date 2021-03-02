const express = require("express");
const bodyParser = require("body-parser");

/// create express app
const app = express();

// setup server port
const port = process.env.PORT || 5000;

// parse request of content-type - application/x-www-for/urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of contet-type - application json
app.use(bodyParser.json());

// define a root route
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// require employee routes
const employeeRoutes = require("./src/routes/employee.routes");

// using as middleware
app.use("/api/v1/employees", employeeRoutes);

// listen for requests
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
