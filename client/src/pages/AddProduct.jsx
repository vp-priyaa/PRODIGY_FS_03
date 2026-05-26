import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct(){

const navigate=useNavigate();

const [name,setName]=useState("");
const [price,setPrice]=useState("");
const [image,setImage]=useState("");
const [category,setCategory]=useState("");

const saveProduct=()=>{

if(
!name ||
!price ||
!image ||
!category
){

alert("Fill all fields");
return;

}

const existing=

JSON.parse(
localStorage.getItem("sellerProducts")
) || [];

const newProduct={

id:Date.now(),

name,

price:Number(price),

image,

category

};

existing.push(newProduct);

localStorage.setItem(
"sellerProducts",
JSON.stringify(existing)
);

alert("✅ Product Added");

navigate("/seller/products");

};

return(

<div className="
min-h-screen
bg-gray-100
flex
justify-center
items-center
p-6
">

<div className="
bg-white
w-full
max-w-2xl
rounded-3xl
shadow-2xl
p-10
">

<h1 className="
text-5xl
font-black
mb-10
text-green-500
">

➕ Add Product

</h1>


<input
type="text"
placeholder="Product Name"
value={name}
onChange={(e)=>
setName(e.target.value)
}
className="
w-full
border
p-4
rounded-2xl
mb-5
outline-none
"
/>


<input
type="number"
placeholder="Price"
value={price}
onChange={(e)=>
setPrice(e.target.value)
}
className="
w-full
border
p-4
rounded-2xl
mb-5
outline-none
"
/>


<input
type="text"
placeholder="Image URL"
value={image}
onChange={(e)=>
setImage(e.target.value)
}
className="
w-full
border
p-4
rounded-2xl
mb-5
outline-none
"
/>


<select
value={category}
onChange={(e)=>
setCategory(e.target.value)
}
className="
w-full
border
p-4
rounded-2xl
mb-8
outline-none
"
>

<option value="">
Select Category
</option>

<option value="Food">🍕 Food</option>

<option value="Groceries">🛒 Groceries</option>

<option value="Fashion">👕 Fashion</option>

<option value="Medical">💊 Medical</option>

<option value="Electronics">📱 Electronics</option>

<option value="Books">📚 Books</option>

<option value="Beauty">💄 Beauty</option>

<option value="Sports">⚽ Sports</option>

<option value="Furniture">🪑 Furniture</option>

<option value="Toys">🧸 Toys</option>

<option value="Pet Care">🐶 Pet Care</option>

<option value="Automotive">🚗 Automotive</option>

<option value="Baby Products">👶 Baby Products</option>

<option value="Home Essentials">🏠 Home Essentials</option>

<option value="Accessories">👜 Accessories</option>

<option value="Stationery">✏️ Stationery</option>

<option value="Gardening">🌱 Gardening</option>

</select>


<button

onClick={saveProduct}

className="
w-full
bg-green-500
hover:bg-green-600
text-white
py-4
rounded-2xl
font-bold
text-xl
transition
"

>

Save Product 🚀

</button>

</div>

</div>

);

}