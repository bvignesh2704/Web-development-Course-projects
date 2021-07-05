const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    
    const query=req.body.cityName;
const apikey="5424acba986f1147e5eea24fb2081f23";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;
https.get(url,function(response){
    console.log(response.statusCode);
   
     response.on("data",function(data){
        const weather=JSON.parse(data);
        const temp=weather.main.temp;
        console.log(temp);
        const description=weather.weather[0].description;
        const icon=weather.weather[0].icon;
        const imageURL="https://api.openweathermap.org/img/wn/" +icon+"@2x.png";
        res.write("<p>desc:"+description+" </p>");
        res.write("<h1>The temp in"+query+" is "+temp+" </h1>");
        res.write("<img src="+imageURL+">");
        res.send();
    })
})

})


app.listen(3000,function(){
    console.log("started");
})