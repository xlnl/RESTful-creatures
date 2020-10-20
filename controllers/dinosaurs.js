const express = require("express");
const router = express.Router();
var fs = require('fs');

// DINO NEW ROUTE 
router.get('/new', (req, res) => {
    res.render('dinosaurs/new');
});

// DINO SHOW ROUTE 
//express show route for dinosaurs (lists one dinosaur)
router.get('/:idx', (req, res) => {
    // get dinosaurs
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs); // convert the string into an array
    //get array index from url parameter
    let dinoIndex = req.params.idx;
    //render page with data of the specified animal 
    res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex});
});

module.exports = router;