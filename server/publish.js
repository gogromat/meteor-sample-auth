Lists    = new Meteor.Collection("lists");

//if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Lists.find().count() === 0) {
      var one  = Lists.insert({"list_name":"First List"});
      var two  = Lists.insert({"list_name":"Second List"});
    }
  });
//}