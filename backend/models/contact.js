const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    reason:{
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
const contact=new mongoose.model("contact",contactSchema);
module.exports=contact;