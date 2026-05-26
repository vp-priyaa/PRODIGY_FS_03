const mongoose=require("mongoose");

const productSchema=
new mongoose.Schema({

name:String,

price:Number,

image:String,

images:[String],

shopId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Shop"
}

});

module.exports=
mongoose.model(
"Product",
productSchema
);