//if (Meteor.isServer) {
  // Meteor.startup(function () {
  //   // code to run on server at startup
  //   if (Lists.find().count() === 0) {
  //     var one  = Lists.insert({"list_name":"First List"});
  //     var two  = Lists.insert({"list_name":"Second List"});
  //   }
  // });
//}
Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("lists", function () {
  return Lists.find(
    {$or: [{"public": true}, {owner: this.userId}]});
});