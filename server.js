


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
  console.log(coffee_list);
  
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.json({'coffees': coffee_list});
  });

  
});

app.post('/api/v1/coffees', function (req, res) {
  //1. create new coffee object
  var newCoffee = req.body.coffee
  // console.log(newCoffee);
  //console.log(coffee.length);

  var newCoffeeStr = {
    id : coffee.length,
    name : newCoffee.name,
    short_description : newCoffee.short_description,
    long_description : newCoffee.long_description,
    price : newCoffee.price,
    image : '',
    who_drinks_it: newCoffee.who_drinks_it,
    how_to_drink: newCoffee.how_to_drink,
    gallery: []
  }
  // console.log(newCoffeeStr);
  coffee.push(newCoffeeStr);
  console.log(coffee);

  //2. append to coffee array

});

app.get("/api/v1/coffees/:id", function(req, res){
 // var coffees = fs.readFile('coffeeData,js', function (err, data) {
 //  if (err) throw err;
 //  console.log(data);
 // });
 res.json({coffees: coffee.filter(function(a, i) {
   return +req.params.id === +a.id;
 })})
})


app.listen(4242, function() {
  console.log('Express server listening on port 4242');
});


