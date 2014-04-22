App = Ember.Application.create();

App.Router.map(function() {
  this.route('edit', {path: '/:id/edit'});
  this.route('add', {path: '/add'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('coffee');
    // console.log(this.store.find('coffee'))
    console.log('here');
    // return Ember.$.getJSON('/api/v1/coffees').then(function(data) {
    //   return data.coffees;
    // });
  }
});

App.EditRoute = Ember.Route.extend({
    model: function(params){
      return this.store.find('coffee', params.id);
    }
})

App.AddRoute = Ember.Route.extend({
    model: function(params){
      return this.store.find('coffee');
    }
})

App.AddController = Ember.ObjectController.extend({
  name: '',
  short_description: '',
  long_description: '',
  // image: '',
  price: '',
  who_drinks_it: '',
  how_to_drink: '',
  // gallery: '',
  actions: {
    addCoffee: function() {
      //0. is submit button binded correctly?
      console.log('addCoffee Called')
      //1. Build new Coffee object
      var coffee = this.store.createRecord('coffee', {
        // console.log(this.get('name'));
        name: this.get('name'),
        short_description: this.get('short_description'),
        long_description: this.get('long_description'),
        // image: this.get('image'),
        price: this.get('price'),
        who_drinks_it: this.get('who_drinks_it'),
        how_to_drink: this.get('how_to_drink'),
        // gallery: this.get('gallery')
      });

      //2. Save the coffee
      coffee.save().then(function(coffee) {
        //Clear controller variables???
        //3. Add to Model
        console.log(this.get('model.coffees'))
        // this.get('model.coffees').addObject(coffee);
      });
    }
  }

});

// App.Store = DS.Store.extend();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
});

App.Coffee = DS.Model.extend({
    name: DS.attr(),
    short_description: DS.attr(),
    long_description: DS.attr(),
    price: DS.attr(),
    who_drinks_it: DS.attr(),
    how_to_drink: DS.attr()
})


