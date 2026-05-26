import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AddShop(){

const navigate=useNavigate();

const [form,setForm]=useState({

name:"",
city:"",
category:""

});

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

const res = await axios.post(
"https://prodigy-fs-03-whp0.onrender.com/api/shops",
form
);

console.log(res.data);

localStorage.setItem(
"sellerShop",
JSON.stringify(form)
);

alert("✅ Shop added");

// go back to dashboard instead
navigate("/dashboard");

}catch(err){

console.log(
"ERROR:",
err.response?.data || err.message
);

alert(
err.response?.data?.message ||
"Failed to create shop"
);

}

};

const shopTimings = [

{open:"08:00",close:"20:00"},
{open:"09:00",close:"21:00"},
{open:"10:00",close:"22:00"},
{open:"07:00",close:"19:00"},
{open:"11:00",close:"23:00"}

];

const timing =
shopTimings[
Math.floor(
Math.random()*shopTimings.length
)
];

return(

<div className="min-h-screen bg-black flex items-center justify-center px-6">

<div className="w-full max-w-xl bg-[#081224] p-8 rounded-3xl shadow-2xl">

<h1 className="text-4xl font-bold text-center text-green-400 mb-2">
🏪 Become a Seller
</h1>

<p className="text-center text-gray-400 mb-8">
Create your local shop and reach customers
</p>

<form
onSubmit={handleSubmit}
className="flex flex-col gap-5"
>

<input
name="name"
placeholder="Shop Name"
value={form.name}
onChange={handleChange}
className="bg-gray-900 text-white p-4 rounded-xl border border-gray-700 outline-none focus:border-green-400"
/>

<input
name="city"
placeholder="City"
value={form.city}
onChange={handleChange}
className="bg-gray-900 text-white p-4 rounded-xl border border-gray-700 outline-none focus:border-green-400"
/>

<select
name="category"
value={form.category}
onChange={handleChange}
className="bg-gray-900 text-white p-4 rounded-xl border border-gray-700 outline-none focus:border-green-400"
>

<option value="">
Select Category
</option>

<option value="Food">
🍕 Food
</option>

<option value="Groceries">
🛒 Groceries
</option>

<option value="Fashion">
👕 Fashion
</option>

<option value="Medical">
💊 Medical
</option>

<option value="Electronics">
📱 Electronics
</option>

<option value="Books">
📚 Books
</option>

<option value="Beauty">
💄 Beauty
</option>

<option value="Sports">
⚽ Sports
</option>

<option value="Furniture">
🛋 Furniture
</option>

<option value="Toys">
🧸 Toys
</option>

<option value="Pet Care">
🐶 Pet Care
</option>

<option value="Automotive">
🚗 Automotive
</option>

<option value="Baby Products">
👶 Baby Products
</option>

<option value="Home Essentials">
🏠 Home Essentials
</option>

<option value="Accessories">
🎧 Accessories
</option>

<option value="Stationery">
✏️ Stationery
</option>

<option value="Gardening">
🌱 Gardening
</option>

</select>

<button
className="bg-green-500 hover:bg-green-600 py-4 rounded-xl text-lg font-semibold transition"
>

Create Shop

</button>

</form>

</div>

</div>

);

}