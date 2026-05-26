const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();

const Shop=require("../models/Shop");
const Product=require("../models/Product");

const productsData=
require("../data/products");
router.get("/",async(req,res)=>{

const shops=await Shop.find();

res.json(shops);

});

router.get("/:id",async(req,res)=>{

const shop=
await Shop.findById(req.params.id);

res.json(shop);

});

router.post("/",async(req,res)=>{

try{

const categoryImages={

Food:[
"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
"https://images.unsplash.com/photo-1552566626-52f8b828add9",
"https://images.unsplash.com/photo-1559339352-11d035aa65de",
"https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
],

Groceries:[
"https://images.unsplash.com/photo-1573246123716-6b1782bfc499",
"https://images.unsplash.com/photo-1604719312566-8912e9c8a213",
"https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8"
],

Fashion:[
"https://images.unsplash.com/photo-1441986300917-64674bd600d8",
"https://images.unsplash.com/photo-1445205170230-053b83016050",
"https://images.unsplash.com/photo-1483985988355-763728e1935b",
"https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
],

Medical:[
"https://images.unsplash.com/photo-1631558556820-89123ea1ef89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTJ8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTc3fHx8ZW58MHx8fHx8",
"https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjIyfHx8ZW58MHx8fHx8",
"https://images.unsplash.com/photo-1581056692101-785f6bbd61ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjAyfHx8ZW58MHx8fHx8"
],

Electronics:[
"https://images.unsplash.com/photo-1498049794561-7780e7231661",
"https://images.unsplash.com/photo-1518770660439-4636190af475",
"https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
"https://images.unsplash.com/photo-1496171367470-9ed9a91ea931",
"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
],

Books:[
"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
"https://images.unsplash.com/photo-1512820790803-83ca734da794",
"https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
"https://images.unsplash.com/photo-1516979187457-637abb4f9353",
"https://images.unsplash.com/photo-1544947950-fa07a98d237f"
],

Beauty:[
"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
"https://images.unsplash.com/photo-1596462502278-27bfdc403348",
"https://images.unsplash.com/photo-1586495777744-4413f21062fa",
"https://images.unsplash.com/photo-1631730486782-d8b6a6a5b5c0",
"https://images.unsplash.com/photo-1620916566398-39f1143ab7be"
],

Sports:[
"https://images.unsplash.com/photo-1517649763962-0c623066013b",
"https://images.unsplash.com/photo-1546519638-68e109498ffc",
"https://images.unsplash.com/photo-1574629810360-7efbbe195018",
"https://images.unsplash.com/photo-1626248801379-51a0748a5f96",
"https://images.unsplash.com/photo-1531415074968-036ba1b575da"
],

Furniture:[
"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8",
"https://images.unsplash.com/photo-1484101403633-562f891dc89a",
"https://images.unsplash.com/photo-1501045661006-fcebe0257c3f",
"https://images.unsplash.com/photo-1513694203232-719a280e022f"
],

Toys:[
"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
"https://images.unsplash.com/photo-1563901935883-cb1f5d46574d",
"https://images.unsplash.com/photo-1587654780291-39c9404d746b",
"https://images.unsplash.com/photo-1516627145497-ae6968895b74",
"https://images.unsplash.com/photo-1572375992501-4b0892d50c69"
],

"Pet Care":[
"https://images.unsplash.com/photo-1517849845537-4d257902454a",
"https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
"https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
"https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
"https://images.unsplash.com/photo-1574158622682-e40e69881006"
],

Automotive:[
"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
"https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
"https://images.unsplash.com/photo-1503376780353-7e6692767b70",
"https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
"https://images.unsplash.com/photo-1489824904134-891ab64532f1"
],

"Baby Products":[
"https://images.unsplash.com/photo-1519340241574-2cec6aef0c01",
"https://images.unsplash.com/photo-1544126592-807ade215a0b",
"https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
"https://images.unsplash.com/photo-1514090458221-65bb69cf63e6",
"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
],

Accessories:[
"https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
"https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
"https://images.unsplash.com/photo-1511499767150-a48a237f0083",
"https://images.unsplash.com/photo-1584917865442-de89df76afd3",
"https://images.unsplash.com/photo-1521369909029-2afed882baee"
],

Stationery:[
"https://images.unsplash.com/photo-1455390582262-044cdead277a",
"https://images.unsplash.com/photo-1531346878377-a5be20888e57",
"https://images.unsplash.com/photo-1507842217343-583bb7270b66",
"https://images.unsplash.com/photo-1513258496099-48168024aec0",
"https://images.unsplash.com/photo-1517842645767-c639042777db"
],

Gardening:[
"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
"https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
"https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
"https://images.unsplash.com/photo-1463154545680-d59320fd685d",
"https://images.unsplash.com/photo-1483794344563-d27a8d18014e"
],

"Home Essentials":[
"https://images.unsplash.com/photo-1558317374-067fb5f30001",
"https://images.unsplash.com/photo-1583947582886-f40ec95dd752",
"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac",
"https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
"https://images.unsplash.com/photo-1616627450259-fb97eb49992d"
]

};

const categoryKey =
Object.keys(categoryImages).find(
key =>
key.toLowerCase().trim() ===
req.body.category.toLowerCase().trim()
);

const images =
categoryImages[categoryKey] || [
"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
];

const randomImage =
images[
Math.floor(
Math.random()*images.length
)
];

const shop=
await Shop.create({

...req.body,

image:
`${randomImage}?auto=format&fit=crop&w=1400&q=80`

});

console.log("Category:", shop.category);

let products=[];

const normalizedCategory = 
shop.category
?.trim()
?.toLowerCase();

const matchedCategory =
Object.keys(productsData).find(
(cat)=>
cat.toLowerCase() === normalizedCategory
);

products =
(productsData[matchedCategory] || [])
.map(product=>({

...product,

category:matchedCategory,

shopId:shop._id

}));

if(products.length>0){

await Product.insertMany(
products
);

}

console.log(
"Products:",
products
);

res.json(shop);

}catch(err){

console.log(err);

res.status(500).json(err);

}

});

router.post("/:id/review", async(req,res)=>{

try{

const {user,rating,comment}=req.body;

const shop=
await Shop.findById(req.params.id);

if(!shop.reviews){

shop.reviews=[];

}

shop.reviews.push({
user,
rating,
comment
});

await shop.save();

res.json(shop);

}catch(err){

res.status(500)
.json(err);

}

});

router.delete("/:id",async(req,res)=>{

try{

await Shop.findByIdAndDelete(
req.params.id
);

await Product.deleteMany({

shopId:req.params.id

});

res.json({

message:"Shop Deleted Successfully"

});

}catch(err){

console.log(err);

res.status(500).json({

message:"Delete Failed"

});

}

});

module.exports=router;