const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/registration_folder")
.then(()=>{
    console.log("connection successfull");
})
.catch(()=>{
    console.log(console.error);
});