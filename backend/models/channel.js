var mongoose = require('mongoose');

var ChannelSchema = new mongoose.Schema({
	name: {type:String,required:true},
	playList: [{
		type: String
	}]
})

module.exports = mongoose.model('Channel',ChannelSchema);