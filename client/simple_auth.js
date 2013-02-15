Meteor.subscribe("users");
Meteor.subscribe("lists");


//if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to simple_auth.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
//}

Template.lists.lists = function () {
  return Lists.find({});
}

Template.lists.events({
  'blur .list_names': function(evt) {
    var new_name = evt.target.value,
        id = this._id;
    console.log("New name is:",new_name);
    Lists.update(id,{$set : {list_name : new_name}});
  }
})