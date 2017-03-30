
var mongoose=require('mongoose');

module.exports=mongoose.model('Book',{
    name:String,
    email: String,
    tel: String,
    size: String,
    date: Date,
    time: Date
    
});













