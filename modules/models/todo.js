var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text : {type : String, default: ''},
	done: {type: Boolean, default: false},
	checked: {type: Boolean, default: false},
	createdOn: {type: Date, default: Date.now}
});