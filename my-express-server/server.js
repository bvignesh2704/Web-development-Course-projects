const express=require("express");
const app =express();

app.get("/",function(request,response){
    response.send("Hello");
});

app.get("/contact",function(req,res){
    res.send("contact me at");
})

app.get("/about",function(req,res){
    res.send("my name is bv");
})

app.get("/hobbies",function(req,res){
    res.send("my name is hobbies");
})

app.listen(3000,function(){
    console.log("server started");
});