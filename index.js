const port = 8000;
const express = require("express");
const app = express();
const ejsLayouts = require('express-ejs-layouts');
var fs = require('fs');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
//body-parser middleware
// put the data in the body field of the request object, makes req.body work
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures); 
    res.render("home", {dinosaurs:dinoData, creatures:creatureData})
})

// DINO INDEX ROUTE 
app.get("/dinosaurs", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs); // convert the string into an array
    
    // handle a query string if there is one
    // console.log(req.query.nameFilter);
    let nameFilter = req.query.nameFilter; // reference the name: nameFilter in the form tag in index.ejs
    if (nameFilter) { // filter list of dinoData based on that string
        dinoData = dinoData.filter((dino) => {
            // return dino.name === nameFilter; // this is case sensitive so have to change it
            return dino.name.toLowerCase() === nameFilter.toLowerCase(); // adds to new array to just get your results
        });
    }
    res.render("dinosaurs/index", {dinosaurs:dinoData});
});

// DINO POST ROUTE
app.post('/dinosaurs', (req, res) => {
    // console.log(req.body); // allowed by using body-parser middleware
    // read dinosaurs file
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    // add item to dinosaurs array
    dinoData.push(req.body);
    // save dinosaurs to the data.json file (dinosaurs.json)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    // JSON.stringify does the opposite of JSON.parse - it converts javascript data into json data.
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');
});

app.use("/dinosaurs", require("./controllers/dinosaurs"))

// CREATURE INDEX ROUTE 
app.get("/prehistoric_creatures", (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures); 
    // handle a query string if there is one
    // console.log(req.query.nameFilter);
    let nameFilter = req.query.nameFilter; // reference the name: nameFilter in the form tag in index.ejs
    if (nameFilter) { // filter list of dinoData based on that string
        creatureData = creatureData.filter((creature) => {
            // return creature.name === nameFilter; // this is case sensitive so have to change it
            return creature.type === nameFilter; // adds to new array to just get your results
        });
    }
    res.render("prehistoric_creatures/index", {creatures:creatureData});
});

// CREATURE POST ROUTE
app.post('/prehistoric_creatures', (req, res) => {
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creatureData = JSON.parse(creatures);
    creatureData.push(req.body);
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData));
    res.redirect('/prehistoric_creatures');
});

app.use("/prehistoric_creatures", require("./controllers/prehistoric_creatures"))

app.listen(port, () => {
  console.log(`You're listing to port ${port}`);
});
