const { name } = require("ejs");
const express = require("express");
const app = express();
const path = require("path");
const fs=require("fs")
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/users/:name", (req, res) => {
    let name = req.params.name;
    res.send(`Hello ${name}`);
});

app.listen(3000, () => {
  console.log("Its running");
});
