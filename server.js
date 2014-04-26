// Look at the ember: http://jsbin.com/izijal/9/edit
var express = require('express');
var livereload = require('express-livereload');
var fs = require('fs');
var app = express();

livereload(app, config={})

// configure Express
app.configure(function() {
  // app.use(express.logger());
  app.use(express.cookieParser('some secret'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));
});

app.get('/api/v1/coffees', function (req, res) {
  fs.readFile('coffeeData.js', 'utf8', function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    // console.log(json);

  coffee_list = json.map(function(x, i){
   return { 
    id: x.id, 
    name: x.name, 
    short_description: x.short_description, 
    long_description: x.long_description, 
    who_drinks_it: x.who_drinks_it, 
    how_to_drink: x.how_to_drink, 
    price: x.price
   };
  })
  // console.log(coffee_list);
  
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.json({'coffees': coffee_list});
  });
  
});

//POST of a new coffee
app.post('/api/v1/coffees', function (req, res) {
  //1. Get new coffee data
  var newCoffeeData = req.body.coffee

  //2. Get master coffee object (from file)
  var coffeeData = fs.readFileSync('coffeeData.js', 'utf8', function (err, data) {
    if (err) throw err;
  });
  var coffeeObj = JSON.parse(coffeeData);

  //3. Build new coffee object
  var newCoffeeObj = {
    id : coffeeObj.length,
    name : newCoffeeData.name,
    short_description : newCoffeeData.short_description,
    long_description : newCoffeeData.long_description,
    price : newCoffeeData.price,
    image : '',
    who_drinks_it: newCoffeeData.who_drinks_it,
    how_to_drink: newCoffeeData.how_to_drink,
    gallery: []
  }
    // console.log(newCoffeeObj);

  //4. Add new coffee obj to master coffee obj
  coffeeObj.push(newCoffeeObj);
  console.log(coffeeObj);

  //5. Save updated coffee obj to file
  var coffeeObjStr = JSON.stringify(coffeeObj);

  fs.writeFile('coffeeData.js', coffeeObjStr, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });

});

app.get("/api/v1/coffees/:id", function(req, res){
 fs.readFile('coffeeData.js', 'utf8', function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);

    res.json({coffees: json.filter(function(a, i) {
      return +req.params.id === +a.id;
    })});
 });
});


app.listen(4242, function() {
  console.log('Express server listening on port 4242');
});


