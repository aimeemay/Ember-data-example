//to do
  //1. add
    //1.1 return something to signal it worked
    //1.2 id
    //1.3 clear controller variables
  //2. edit
    //2.1 add validation that page has been edited http://emberjs.com/guides/getting-started/accepting-edits/

App = Ember.Application.create();

App.Router.map(function() {
  this.route('edit', {path: '/:id/edit'});
  this.route('add', {path: '/add'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('coffee');
    // console.log(this.store.find('coffee')
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

App.EditController = Ember.ObjectController.extend({
  prices : [1, 2, 3, 4],
  actions: {
    editCoffee: function() {
      // console.log('editCoffee Called')
      //1. Save model
      this.get('model').save();
      //2. 
    }
  }
});

App.AddRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('coffee');
  }
});

App.AddController = Ember.ObjectController.extend({
  prices: [1, 2, 3, 4],
  name: '',
  short_description: '',
  long_description: '',
  price: 2,
  who_drinks_it: '',
  how_to_drink: '',
  actions: {
    addCoffee: function() {
      //1. Build new Coffee object
      var coffee = this.store.createRecord('coffee', {
        name: this.get('name'),
        short_description: this.get('short_description'),
        long_description: this.get('long_description'),
        price: this.get('price'),
        who_drinks_it: this.get('who_drinks_it'),
        how_to_drink: this.get('how_to_drink'),
      });

      //2. Save the coffee
      var controller = this;

      coffee.save().then(function() {
        //3. Clear controller variables???
          console.log('got here')
          controller.set('name', 'test');
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
    image: DS.attr(),
    who_drinks_it: DS.attr(),
    how_to_drink: DS.attr(),
    gallery: DS.attr()
})


