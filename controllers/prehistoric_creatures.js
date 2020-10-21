const express = require("express");
const router = express.Router();
var fs = require('fs');

// CREATURE NEW ROUTE 
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new');
});

// CREATURE SHOW ROUTE 
router.get('/:idx', (req, res) => {
    // get dinosaurs
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures); 
    let creatureIndex = req.params.idx;
    res.render('prehistoric_creatures/show', {creature: creatureData[creatureIndex], creatureId: creatureIndex});
});

router.get("/edit/:idx", (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures); 
    let creatureIndex = req.params.idx;
    res.render('prehistoric_creatures/edit', {creature: creatureData[creatureIndex], creatureId: creatureIndex});
});

module.exports = router;