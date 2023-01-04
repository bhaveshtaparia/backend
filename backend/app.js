const express=require('express');
const auth=require('./middleware/auth');
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
require('./db/conn');
const resister=require('./models/resister');
const app=express();
const path=require('path');
const abc=path.join(__dirname,'./../frontend/')
const contact=require('./models/contact');
const help=require('./models/help');
// console.log(abc);
const port=5000;
app.use(cookieParser())
app.set("view engine","hbs");
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended:false}));
app.get('/logout',auth,async(req,res)=>{
    try{
// res.send(req.user);
res.clearCookie('jwt');
req.user.tokens=[];
await req.user.save();
res.render("login",{text:"Logout successfully"});
}catch(err){
    // console.log(err);
    res.render("login",{text:"Try after some time"});
    }
})
app.get('/',(req,res)=>{
    res.render("login");

});
app.get('/about.html',auth,(req,res)=>{
    res.sendFile(abc+"about.html");
})
app.get('/index.html',auth,(req,res)=>{
    res.sendFile(abc+"index.html");
})
app.get('/contact.html',auth,(req,res)=>{
    res.sendFile(abc+"contact.html");
})
app.get('/help.html',auth,(req,res)=>{
    res.sendFile(abc+"help.html");
})
app.get('/resister',(req,res)=>{
res.render("resister")
});

app.post('/resister', async(req,res)=>{
    try{
    
        if(! await resister.findOne({name:req.body.name})){

            const a=req.body.password;
            const b=req.body.cpassword;
            if(a===b){
                // console.log("working");
                const resisterS= new resister({
                    name:req.body.name,
                    number:req.body.number,
                    password:req.body.password,
                    cpassword:req.body.cpassword
                });
                const token=await resisterS.createtoken();
                // console.log(token);
                res.cookie('jwt',token,{
                    expires:new Date(Date.now()+300000),
                    httpOnly:true
                })
                
                const resis= await resisterS.save();
                res.sendFile(abc+'/index.html');
            }
            else{
                res.render("resister",{text:"INVALID DETAILS"});
            }
        }else{
            res.render("resister",{text:"User name already exists"});

        }
        }catch(err){
            res.render("resister",{text:"INVALID DETAILS"});
        // res.send("invalid detail");
    }
    // res.send(req.body.name);
    // console.log(req.body.name);
    
})
app.post('/login',async(req,res)=>{
    try{
        const name=req.body.name;
        const password=req.body.password;
        const result= await resister.findOne({name:name});
        // console.log(result+name);
        if(bcrypt.compare( password,result.password)){
            const token=await result.createtoken();
            // console.log(token);
            res.cookie('jwt',token,{
                expires:new Date(Date.now()+300000),
                httpOnly:true
            })
            res.sendFile(abc+'/index.html');
        }
        else{
            res.render("login",{text:"INVALID DETAILS"});
        }

    }catch(err){
        res.render("login",{text:"INVALID DETAILS"});
    }
})



app.post('/contact',async(req,res)=>{
// res.send(req.body.email);
try{
const contacts=new contact({
    email:req.body.email,
    reason:req.body.reason,
    discription:req.body.discription
});
const result=await contacts.save();
// res.sendFile(t);
res.sendFile(abc+"contact.html");
}catch(err){
    console.log(err);
}

})
app.post('/help',async(req,res)=>{
// res.send(req.body.email);
try{
const helps=new help({
    email:req.body.email,
    reason:req.body.reason,
    suggestion:req.body.suggestion,
    discription:req.body.discription
});
const result=await helps.save();
res.sendFile(abc+"help.html");

}catch(err){
    console.log(err);
}

})
app.get("*",(req,res)=>{
    res.sendFile(abc+"anaimation.html");
})
app.listen(port,()=>{
    console.log(`working on port ${port}`);
})