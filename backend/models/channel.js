var mongoose = require('mongoose');

var ChannelSchema = new mongoose.Schema({
	name: {type:String,required:true},
	playList: [{
		songName: { type : String },
		artist: { type : String },
		url: { type : String }
	}]
})

module.exports = mongoose.model('Channel',ChannelSchema);