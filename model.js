Lists = new Meteor.Collection("lists");

// Meteors allow and deny rules control what comes from the 
// client's end directly and don't apply for 
// anything running on the server's end.
Lists.allow({
	insert: function(userId, list) {
		//return userId && list.owner === userId;
		return false;
		// can only insert through one of Meteor.methods
	},
	update: function(userId, lists, fields, modifier) {
		// true if all is good, false otherwise
		return _.all(lists, function (list) {
			if (userId !== list.owner) {
				return false;
			}
			// if more fields are modified, (say user id),
			// then return false
			var allowed = ["list_name"];
			if (_.difference(fields, allowed).length) {
				return false;
			}
			return true;
		});
	},
	remove: function(userId, lists) {
		return false;
	}
});


// Lets execute method call only on server please
if (Meteor.isServer) {
	Meteor.methods({
		add_list: function (name) {
			if (!name) {
				throw new Meteor.Error(400, "Name parameter is missing");
			} else if (!this.userId) {
				throw new Meteor.Error(403, "You must be logged in");
			}
			return Lists.insert({
				owner: this.userId,
				list_name: name	
			});	
		}
	});
}