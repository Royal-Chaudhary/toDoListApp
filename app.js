const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
    {
        id: 1,
        name: "car"
    }
];
let idCounter = 2;

app.get("/", function(req, res) {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { kindOfDay: day, newListItem: items })

});



app.post("/", function(req, res) {
    var item = {
        id: idCounter++,
        name: req.body.newItem
    };

    items.push(item);
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    const itemId = parseInt(req.body.itemId);
    items = items.filter(item => item.id !== itemId);
    res.redirect("/");
});

app.post("/edit", function(req, res) {
    const itemId = parseInt(req.body.itemId);
    const newName = req.body.newName;
    const index = items.findIndex(item => item.id === itemId);
    items[index].name = newName;
    res.redirect("/");
});

app.listen(port, function() {
    console.log(`App is running on: ${port}\nhttp://localhost:${port}`)
});
