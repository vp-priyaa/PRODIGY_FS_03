const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const app=express();

app.use(cors());
app.use(express.json());

const authRoutes=require("./routes/authRoutes");
const shopRoutes=require("./routes/shopRoutes");

app.use("/api/auth",authRoutes);
app.use("/api/shops",shopRoutes);

const productRoutes=
require("./routes/productRoutes");

app.use(
"/api/products",
productRoutes
);

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

app.get("/",(req,res)=>{
res.send("Zoopar Backend Running");
});

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});