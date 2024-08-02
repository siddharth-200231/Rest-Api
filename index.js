const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "files", "notes.txt"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading the file.");
        }
        const tasks = data.split(";").filter(task => task.trim() !== "");
        res.render("index", { tasks });
    });
});

app.post("/create", (req, res) => {
    const { title, details } = req.body;
    const content = `${title} ${details}; `;
    fs.appendFile(path.join(__dirname, "files", "notes.txt"), content, (err) => {
        if (err) {
            return res.status(500).send("Error writing to the file.");
        }
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
