const express = require("express");
const router = express.Router();
var fs = require('fs');

// DINO NEW ROUTE 
// this will get you to read the form made in the render link below (the HTML file for this)
router.get('/new', (req, res) => {
    res.render('dinosaurs/new');
});

// DINO SHOW ROUTE 
// express show route for dinosaurs (lists one dinosaur)
// show = route that displays a single item of a specific type; & since we're still just reading data, it's a GET request
router.get('/:idx', (req, res) => {
    // get dinosaurs
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs); // convert the string into an array
    //get array index from url parameter
    let dinoIndex = req.params.idx;
    //render page with data of the specified animal 
    res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex});
});

router.get("/edit/:idx", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoID: req.params.idx});
});

// DINO DELETE ROUTE
router.delete("/:idx", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);

    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)

    // save the new dinosaurs to the data.json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
    res.redirect("/dinosaurs");
});

module.exports = router;