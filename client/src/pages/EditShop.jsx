import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function EditShop(){

const navigate=useNavigate();

const [darkMode,setDarkMode]=useState(false);

const [shop,setShop]=
useState({

name:"",
address:"",
category:"",
opening:"",
closing:"",
phone:"",
email:"",
description:"",
image:""

});



// =====================
// LOAD DATA
// =====================

useEffect(()=>{

const saved=
JSON.parse(
localStorage.getItem(
"shopDetails"
)
);

if(saved){

setShop(saved);

}

const theme=
JSON.parse(
localStorage.getItem(
"darkMode"
)
);

if(theme!==null){

setDarkMode(theme);

}

},[]);




// =====================
// SAVE SHOP
// =====================

const save=()=>{

if(
!shop.name ||
!shop.address ||
!shop.category
){

alert(
"Please fill required fields"
);

return;

}

localStorage.setItem(

"shopDetails",

JSON.stringify(shop)

);

alert(
"✅ Shop Details Saved"
);

};




// =====================
// INPUT HANDLER
// =====================

const handleChange=(e)=>{

setShop({

...shop,

[e.target.name]:
e.target.value

});

};




// =====================
// RETURN
// =====================

return(

<div className={`

min-h-screen
p-8

${
darkMode
? "bg-black text-white"
: "bg-gray-100 text-black"
}

`}>



{/* HEADER */}

<div className="
flex
justify-between
items-center
flex-wrap
gap-5
mb-10
">

<div>

<h1 className="
text-5xl
font-black
">
🏬 Edit Shop
</h1>

<p className={`

mt-3
text-lg

${
darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>

Manage your shop information professionally 🚀

</p>

</div>



<button

onClick={()=>
navigate("/sellerpanel")
}

className="
bg-red-500
hover:bg-red-600
transition-all
px-6
py-3
rounded-2xl
font-bold
text-white
shadow-lg
"

>

⬅ Back

</button>

</div>





{/* FORM */}

<div className={`

rounded-3xl
p-8
shadow-2xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>



{/* SHOP IMAGE */}

<div className="mb-8">

<img

src={
shop.image?.trim()

? shop.image

: "https://images.unsplash.com/photo-1488459716781-31db52582fe9"
}

alt="Shop"

onError={(e)=>{

e.target.src=
"https://images.unsplash.com/photo-1488459716781-31db52582fe9";

}}

className="
w-full
h-[300px]
object-cover
rounded-3xl
shadow-xl
"
/>

</div>





<div className="
grid
grid-cols-1
md:grid-cols-2
gap-6
">



{/* SHOP NAME */}

<input

name="name"

placeholder="Shop Name"

value={shop.name}

onChange={handleChange}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>




{/* CATEGORY */}

<input

name="category"

placeholder="Category"

value={shop.category}

onChange={handleChange}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>




{/* PHONE */}

<input

name="phone"

placeholder="Phone Number"

value={shop.phone}

onChange={handleChange}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>




{/* EMAIL */}

<input

name="email"

placeholder="Email Address"

value={shop.email}

onChange={handleChange}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>




{/* OPENING */}

<input

name="opening"

placeholder="Opening Time"

value={shop.opening}

onChange={handleChange}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>




{/* CLOSING */}

<input

name="closing"

placeholder="Closing Time"

value={shop.closing}

onChange={handleChange}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>




{/* SHOP IMAGE */}

<input

name="image"

placeholder="Shop Image URL"

value={shop.image}

onChange={handleChange}

className={`

md:col-span-2
p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>

</div>





{/* ADDRESS */}

<textarea

name="address"

placeholder="Shop Address"

value={shop.address}

onChange={handleChange}

className={`

w-full
mt-6
p-4
rounded-2xl
outline-none
h-28

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>





{/* DESCRIPTION */}

<textarea

name="description"

placeholder="Shop Description"

value={shop.description}

onChange={handleChange}

className={`

w-full
mt-6
p-4
rounded-2xl
outline-none
h-36

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 border border-gray-300 text-black"
}

`}
/>





{/* BUTTONS */}

<div className="
flex
gap-5
mt-8
flex-wrap
">

<button

onClick={save}

className="
flex-1
bg-green-500
hover:bg-green-600
transition-all
py-4
rounded-2xl
font-bold
text-lg
shadow-xl
text-white
"

>

💾 Save Shop

</button>



<button

onClick={()=>
navigate("/sellerpanel")
}

className="
flex-1
bg-gray-700
hover:bg-gray-800
transition-all
py-4
rounded-2xl
font-bold
text-lg
shadow-xl
text-white
"

>

Cancel

</button>

</div>

</div>





{/* PREVIEW */}

<div className={`

mt-12
rounded-3xl
overflow-hidden
shadow-2xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

<img

src={
shop.image?.trim()

? shop.image

: "https://images.unsplash.com/photo-1488459716781-31db52582fe9"
}

alt="Preview"

onError={(e)=>{

e.target.src=
"https://images.unsplash.com/photo-1488459716781-31db52582fe9";

}}

className="
w-full
h-[320px]
object-cover
"
/>



<div className="p-8">

<h2 className="
text-4xl
font-black
">
{shop.name || "Shop Name"}
</h2>

<p className="
mt-3
text-green-500
font-bold
text-lg
">
🏷 {shop.category || "Category"}
</p>

<p className="
mt-4
text-lg
">
📍 {shop.address || "Shop Address"}
</p>

<p className="
mt-3
">
📞 {shop.phone || "Phone"}
</p>

<p className="
mt-3
">
✉ {shop.email || "Email"}
</p>

<p className="
mt-3
">
🕒 {shop.opening || "9:00 AM"} - {shop.closing || "9:00 PM"}
</p>

<p className={`

mt-6
leading-relaxed

${
darkMode
? "text-gray-300"
: "text-gray-700"
}

`}>

{shop.description ||
"Your shop description will appear here..."}

</p>

</div>

</div>

</div>

);

}