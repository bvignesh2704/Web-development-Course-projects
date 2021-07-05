const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser:true});

const fruitSchema=new mongoose.Schema({
    name:String,
    rating:Number,
    review:String
})

const Fruit=mongoose.model("Fruit",fruitSchema);

const fruit=new Fruit({
    name:"Apple",
    rating:7,
    review:"Pretty solid"
});

//fruit.save();

const personSchema=new mongoose.Schema({
    name:String,
    age:Number
});

const Person=mongoose.model("Person",personSchema);

const person=new Person({
    name:"John",
    age:37
});

//person.save();

Fruit.find(function(err,fruits){
    if(err){
        console.log(err);
    }else{
        console.log(fruits);
    }
})
