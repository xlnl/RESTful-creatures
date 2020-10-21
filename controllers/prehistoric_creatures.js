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

// CREATURE DELETE ROUTE
router.delete("/:idx", (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures);

    // remove the deleted dinosaur from the dinosaurs array
    creatureData.splice(req.params.idx, 1)
    // remember to add the "params" plural so it works and will delete what is being deleted!
    // save the new dinosaurs to the data.json file
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData));
    res.redirect('/prehistoric_creatures');
});

module.exports = router;