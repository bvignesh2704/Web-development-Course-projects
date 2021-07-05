const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    console.log(firstName,lastName,email)

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }

            }
        ]
    };
    var jsondata=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/41b7ccce1c"
    const options={
        method:"POST",
        auth:"vignesh:f0f3ebdb258b4e82785f4d835c0c7036-us10"

    };
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.send(__dirname+"/failure.html");
        }
        
        response.on("data",function(data){
        console.log(JSON.parse(data));
    })
    })
    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT,function(){
    console.log("running on 3000");
})

//api key
//f0f3ebdb258b4e82785f4d835c0c7036-us10

//list id
//41b7ccce1c