const mongoose=require('mongoose');
const helpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    reason:{
    type:String,
    required:true
},
    suggestion:{
    type:String,
    required:true
},
discription:{
    type:String,
    required:true
},

date:{
    type:Date,
    default:Date.now
}
});
const help=new mongoose.model("help",helpSchema);
module.exports=help;