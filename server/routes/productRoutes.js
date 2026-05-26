const express=require("express");

const router=express.Router();

const Product=require("../models/Product");



// ========================================
// GET PRODUCTS OF A SHOP
// ========================================

router.get(
"/shop/:shopId",
async(req,res)=>{

try{

const products=
await Product.find({

shopId:req.params.shopId

});

res.json(products);

}catch(err){

console.log(err);

res.status(500).json({

message:"Failed to load products"

});

}

}
);




// ========================================
// SEARCH PRODUCTS
// ========================================

router.get(
"/search/:term",
async(req,res)=>{

try{

const term=req.params.term;

const products=
await Product.find({

$or:[

{
name:{
$regex:term,
$options:"i"
}
},

{
category:{
$regex:term,
$options:"i"
}
}

]

});

const shopIds=[

...new Set(

products.map(
p=>p.shopId.toString()
)

)

];

res.json(shopIds);

}catch(err){

console.log(err);

res.status(500).json({

message:"Search failed"

});

}

}
);




// ========================================
// GET SINGLE PRODUCT
// ========================================

router.get(
"/product/:id",
async(req,res)=>{

try{

const product=
await Product.findById(
req.params.id
);

if(!product){

return res
.status(404)
.json({

message:"Product not found"

});

}

res.json(product);

}catch(err){

console.log(err);

res.status(500).json({

message:"Error loading product"

});

}

}
);




// ========================================
// FILTER PRODUCTS BY PRICE
// ========================================

router.get(
"/filter/:min/:max",
async(req,res)=>{

try{

const min=
Number(req.params.min);

const max=
Number(req.params.max);

const products=
await Product.find({

price:{

$gte:min,
$lte:max

}

});

res.json(products);

}catch(err){

console.log(err);

res.status(500).json({

message:"Filter failed"

});

}

}
);




// ========================================
// FILTER PRODUCTS BY CATEGORY
// ========================================

router.get(
"/category/:category",
async(req,res)=>{

try{

const products=
await Product.find({

category:req.params.category

});

res.json(products);

}catch(err){

console.log(err);

res.status(500).json({

message:"Category filter failed"

});

}

}
);




// ========================================
// SORT PRODUCTS
// ========================================

router.get(
"/sort/:type",
async(req,res)=>{

try{

let sortObj={};

if(
req.params.type==="low"
){

sortObj={
price:1
};

}

else if(
req.params.type==="high"
){

sortObj={
price:-1
};

}

else if(
req.params.type==="latest"
){

sortObj={
_id:-1
};

}

const products=
await Product.find()
.sort(sortObj);

res.json(products);

}catch(err){

console.log(err);

res.status(500).json({

message:"Sort failed"

});

}

}
);




// ========================================
// RANDOM RECOMMENDED PRODUCTS
// ========================================

router.get(
"/recommended/random",
async(req,res)=>{

try{

const products=
await Product.aggregate([

{
$sample:{
size:8
}
}

]);

res.json(products);

}catch(err){

console.log(err);

res.status(500).json({

message:"Recommendation failed"

});

}

}
);




// ========================================
// LATEST PRODUCTS
// ========================================

router.get(
"/latest/products",
async(req,res)=>{

try{

const products=
await Product.find()
.sort({_id:-1})
.limit(10);

res.json(products);

}catch(err){

console.log(err);

res.status(500).json({

message:"Failed to load latest products"

});

}

}
);




// ========================================
// CREATE PRODUCT
// ========================================

router.post(
"/create",
async(req,res)=>{

try{

const product=
await Product.create({

name:req.body.name,

price:req.body.price,

image:req.body.image,

category:req.body.category,

shopId:req.body.shopId

});

res.json(product);

}catch(err){

console.log(err);

res.status(500).json({

message:"Product creation failed"

});

}

}
);




// ========================================
// UPDATE PRODUCT
// ========================================

router.put(
"/update/:id",
async(req,res)=>{

try{

const updated=
await Product.findByIdAndUpdate(

req.params.id,

req.body,

{new:true}

);

if(!updated){

return res
.status(404)
.json({

message:"Product not found"

});

}

res.json(updated);

}catch(err){

console.log(err);

res.status(500).json({

message:"Update failed"

});

}

}
);




// ========================================
// DELETE PRODUCT
// ========================================

router.delete(
"/delete/:id",
async(req,res)=>{

try{

const product=
await Product.findByIdAndDelete(
req.params.id
);

if(!product){

return res
.status(404)
.json({

message:"Product not found"

});

}

res.json({

message:"Product deleted successfully"

});

}catch(err){

console.log(err);

res.status(500).json({

message:"Delete failed"

});

}

}
);




// ========================================
// DELETE ALL PRODUCTS OF SHOP
// ========================================

router.delete(
"/shop/delete/:shopId",
async(req,res)=>{

try{

await Product.deleteMany({

shopId:req.params.shopId

});

res.json({

message:"All shop products deleted"

});

}catch(err){

console.log(err);

res.status(500).json({

message:"Bulk delete failed"

});

}

}
);




module.exports=router;