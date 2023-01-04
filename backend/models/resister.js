const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const resisterSchema= new mongoose.Schema({
name:{
    type:String,
    unique:true,
    required:true
},
number:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true

},
cpassword:{
    type:String,
    required:true

},
tokens:[{
    token:{
        type:String,
        required:true
    }
}]
})
resisterSchema.methods.createtoken=async function(next){
try{
const token= await jwt.sign({_id:this._id.toString()},"abcdefghijklmnopqrstuvwxyz123456789");
// console.log(token);
this.tokens=await this.tokens.concat({token:token});
await this.save();
return token;
next();
}catch(err){
    console.log(err);
}
}
resisterSchema.pre('save',async function(next){
this.password=await bcrypt.hash(this.password,10);
this.cpassword=await bcrypt.hash(this.cpassword,10);
next();
})
const resister=new mongoose.model("resister",resisterSchema);
module.exports=resister;