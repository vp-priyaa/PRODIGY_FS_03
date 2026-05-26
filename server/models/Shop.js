const mongoose=require("mongoose");

const shopSchema=new mongoose.Schema({

name:{
type:String,
required:true
},

city:{
type:String,
required:true
},

category:{
type:String,
required:true
},

image:{
type:String,
default:""
},

openingTime:{
type:String,
default:"09:00"
},

closingTime:{
type:String,
default:"21:00"
},

deliveryTime:{
type:String,
default:"20-30 mins"
},

reviews:[
{
user:String,
rating:Number,
comment:String
}
]

});

module.exports=
mongoose.model(
"Shop",
shopSchema
);