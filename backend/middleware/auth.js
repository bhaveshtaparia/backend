const resister=require('../models/resister');
const jwt=require('jsonwebtoken');
const auth=async(req,res,next)=>{
    try{
const verifyT= await jwt.verify(req.cookies.jwt,"abcdefghijklmnopqrstuvwxyz123456789");
const user=await resister.findOne({_id:verifyT._id});
// console.log(compa);
req.user=user;
next();
    }catch(err){
        res.render("login",{text:" session expired Login again"});
    }
}
module.exports=auth;