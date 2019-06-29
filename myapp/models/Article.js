var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var schema = new Schema({ 
 title: {type: String, required: true}, 
 description: {type: String, required: true}, 
 users: {type: String, required: true} 
}); 
module.exports = mongoose.model('users', schema);