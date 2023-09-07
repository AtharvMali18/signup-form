
const express=require("express");
const path=require("path")
const app=express();

let port=3000;
const empcollection=require('./model/model');

const template_path = path.join(__dirname,"../template/views");
require('./db/db');
app.set('view engine','hbs');
app.set('views',template_path);


app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/empdata',async (req,res)=>{
    // console.log(req.body.username);
    // res.send(req.body.username);

    try{
        const password=req.body.password;
    const cpassword=req.body.cpassword;

    if(password===cpassword){
        const empData=new empcollection({
            name:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            cpassword:req.body.cpassword
        });

        const postdata=await empData.save();
        res.send(postdata);
    }
    else{
        res.send("please check your password and confirm password");
    }
    }
    catch(error){
        console.log(error);
        res.send(error)
    }
});


app.listen(3000,()=>{
    console.log("connection establish to the port");
});