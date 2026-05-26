import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {

const navigate = useNavigate();

const [shops,setShops]=useState([]);
const [selectedCity,setSelectedCity]=useState("All");

const [searchInput,setSearchInput]=useState("");
const [activeSearch,setActiveSearch]=useState("");
const [search,setSearch]=useState("");

const [sortBy,setSortBy]=useState("default");

const [matchedShopIds,setMatchedShopIds]=useState([]);

const [cartCount,setCartCount]=useState(0);
const [favCount,setFavCount]=useState(0);

const [favorites,setFavorites]=useState(

JSON.parse(
localStorage.getItem("favorites")
) || []

);

const [darkMode,setDarkMode]=useState(()=>{

return JSON.parse(
localStorage.getItem("darkMode")
) || false;

});


/* FLASH TIMER */

const [timeLeft,setTimeLeft]=useState(5 * 60 * 60);

useEffect(()=>{

const timer=setInterval(()=>{

setTimeLeft((prev)=>{

if(prev<=1){

clearInterval(timer);
return 0;

}

return prev-1;

});

},1000);

return ()=>clearInterval(timer);

},[]);

const hours=
String(
Math.floor(timeLeft/3600)
).padStart(2,"0");

const minutes=
String(
Math.floor((timeLeft%3600)/60)
).padStart(2,"0");

const seconds=
String(
timeLeft%60
).padStart(2,"0");


/* SEARCH */

useEffect(()=>{

const delay=setTimeout(async()=>{

if(!search.trim()){

setMatchedShopIds([]);
return;

}

try{

const res=await axios.get(
`http://localhost:5000/api/products/search/${search}`
);

setMatchedShopIds(
res.data.map(id=>id.toString())
);

}catch(err){

console.log(err);

}

},300);

return ()=>clearTimeout(delay);

},[search]);


/* CART */

useEffect(()=>{

const updateCart=()=>{

setCartCount(

JSON.parse(
localStorage.getItem("cart")
)?.length || 0

);

};

const updateFav=()=>{

setFavCount(

JSON.parse(
localStorage.getItem("favorites")
)?.length || 0

);

};

updateCart();
updateFav();

window.addEventListener(
"cartUpdated",
updateCart
);

return ()=>{

window.removeEventListener(
"cartUpdated",
updateCart
);

};

},[]);


/* FETCH SHOPS */

const fetchShops=async()=>{

try{

const res=await axios.get(
"http://localhost:5000/api/shops"
);

setShops(res.data);

}catch(err){

console.log(err);

}

};

useEffect(()=>{

fetchShops();

},[]);


/* FAVORITES */

const toggleFavorite=(shop)=>{

let updated=[...favorites];

const exists=
updated.find(
item=>item._id===shop._id
);

if(exists){

updated=
updated.filter(
item=>item._id!==shop._id
);

}else{

updated.push(shop);

}

setFavorites(updated);

setFavCount(updated.length);

localStorage.setItem(
"favorites",
JSON.stringify(updated)
);

};


/* DELETE */

const deleteShop=async(id)=>{

try{

await axios.delete(
`http://localhost:5000/api/shops/${id}`
);

fetchShops();

}catch(err){

console.log(err);

}

};


/* RATINGS */

const ratings={

Groceries:4.8,
Food:4.6,
Medical:4.9,
Fashion:4.5,
Electronics:4.7,
Books:4.6,
Beauty:4.8,
Sports:4.5,
Furniture:4.7,
Toys:4.6,
PetCare:4.8,
Automotive:4.4

};


/* DELIVERY */

const getDeliveryTime=(shop)=>{

const mins=[
"15-20 mins",
"20-30 mins",
"25-35 mins",
"10-15 mins",
"30-40 mins"
];

let hash=0;

for(let i=0;i<shop.city.length;i++){

hash += shop.city.charCodeAt(i);

}

return mins[
hash % mins.length
];

};


/* FILTER */

const filteredShops=[...shops];

const finalShops=filteredShops

.filter((shop)=>{

const cityMatch=

selectedCity==="All" ||

shop.city?.toLowerCase()===
selectedCity.toLowerCase();

const searchText=
activeSearch.toLowerCase()

const searchMatch=

shop.name
?.toLowerCase()
.includes(searchText)

||

shop.category
?.toLowerCase()
.includes(searchText)

||

matchedShopIds.includes(
shop._id.toString()
);

return cityMatch && searchMatch;

})

.sort((a,b)=>{

if(sortBy==="rating"){

return (
(ratings[b.category] || 4.7) -
(ratings[a.category] || 4.7)
);

}

if(sortBy==="name"){

return a.name.localeCompare(
b.name
);

}

if(sortBy==="delivery"){

const deliveryA=
Number(
getDeliveryTime(a)
.split("-")[0]
);

const deliveryB=
Number(
getDeliveryTime(b)
.split("-")[0]
);

return deliveryA-deliveryB;

}

return 0;

});

useEffect(()=>{

if(
activeSearch &&
finalShops.length>0
){

setTimeout(()=>{

const element=document.getElementById(
`shop-${finalShops[0]._id}`
);

if(element){

element.scrollIntoView({

behavior:"smooth",
block:"center"

});

}

},300);

}

},[activeSearch]);

/* CATEGORY IMAGES */

const categoryImages={

groceries:
"https://images.unsplash.com/photo-1542838132-92c53300491e",

food:
"https://images.unsplash.com/photo-1552566626-52f8b828add9",

fashion:
"https://images.unsplash.com/photo-1441986300917-64674bd600d8",

medical:
"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",

electronics:
"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",

books:
"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",

beauty:
"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",

sports:
"https://images.unsplash.com/photo-1517649763962-0c623066013b",

furniture:
"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"

};


const getShopImage=(shop)=>{

const cat=
shop.category?.toLowerCase();

return categoryImages[cat]
||
"https://images.unsplash.com/photo-1504674900247-0877df9cc836";

};


/* OFFERS */

const offers=[

"🔥 20% OFF",
"🎁 Buy 1 Get 1",
"💥 Free Delivery",
"🛍 Flat ₹100 OFF",
"⚡ Today Special Offer"

];

const getOffer=(shop)=>{

let hash=0;

for(let i=0;i<shop.name.length;i++){

hash += shop.name.charCodeAt(i);

}

return offers[
hash % offers.length
];

};

const isShopOpen=(shop)=>{

const currentHour=
new Date().getHours();

const open=9;
const close=22;

return currentHour>=open &&
currentHour<close;

};

return(

<div className={`

min-h-screen
p-6
pb-20

${darkMode
? "bg-black text-white"
: "bg-gray-100 text-black"}

`}>



{/* NAVBAR */}

<div className={`

rounded-3xl
px-8
py-4
flex
justify-between
items-center
sticky
top-3
z-50
shadow-xl

${darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"}

`}>

<h1 className={`

text-5xl
font-black

${darkMode
? "text-green-400"
: "text-green-600"}

`}>

Zoopar

</h1>


<div className="
flex
gap-3
items-center
flex-wrap
">

<input
placeholder="Search shops or products..."
value={searchInput}

onChange={(e)=>{

setSearchInput(e.target.value);

}}

onKeyDown={(e)=>{

if(e.key==="Enter"){

setActiveSearch(searchInput);

}

}}

className={`

w-[400px]
rounded-2xl
px-5
py-3
outline-none

${darkMode
? "bg-black text-white"
: "bg-white text-black border"}

`}
/>

<button

onClick={()=>{

setActiveSearch(searchInput);

}}

className="
bg-green-500
px-6
py-3
rounded-2xl
font-bold
hover:scale-105
transition
"

>

🔍 Search

</button>

<button
onClick={()=>navigate("/favorites")}
className="
bg-pink-500
px-5
py-3
rounded-2xl
font-bold
"
>
❤️ {favCount}
</button>

<button
onClick={()=>navigate("/cart")}
className="
bg-yellow-500
px-5
py-3
rounded-2xl
font-bold
"
>
🛒 {cartCount}
</button>

<button
onClick={()=>navigate("/orders")}
className="
bg-purple-500
px-5
py-3
rounded-2xl
font-bold
"
>
📦 Orders
</button>

<button
onClick={()=>
navigate("/order-history")
}
className="
bg-indigo-500
px-5
py-3
rounded-2xl
font-bold
hover:scale-105
transition
"
>
📜 History
</button>

<button
onClick={()=>navigate("/chat")}
className="
bg-cyan-500
px-5
py-3
rounded-2xl
font-bold
"
>
💬 Chat
</button>

<button

onClick={()=>{

const newTheme=!darkMode;

setDarkMode(newTheme);

localStorage.setItem(
"darkMode",
JSON.stringify(newTheme)
);

}}

className={`

px-5
py-3
rounded-2xl
font-bold

${darkMode
? "bg-white text-black"
: "bg-gray-800 text-white"}

`}

>

{darkMode
? "☀️ Light"
: "🌙 Dark"}

</button>

</div>

</div>




{/* PREMIUM HERO */}

<div className="
relative
mt-10
overflow-hidden
px-4
">

{/* GLOW EFFECTS */}

<div className="
absolute
top-[-120px]
left-[-100px]
w-[320px]
h-[320px]
bg-green-400/20
blur-[120px]
rounded-full
"></div>

<div className="
absolute
bottom-[-150px]
right-[-100px]
w-[350px]
h-[350px]
bg-emerald-500/20
blur-[140px]
rounded-full
"></div>





{/* MAIN CONTENT */}

<div className="
relative
z-10
grid
lg:grid-cols-2
gap-10
items-center
">




{/* LEFT SIDE */}

<div>

{/* SMALL PREMIUM BADGE */}

<h1 className="
text-5xl
md:text-8xl
font-black
leading-[0.9]
tracking-tight
">

<span className="text-orange-600">
Delivering
</span>

<span className="
block
mt-3
text-yellow-500
">

Local Stores 🛍️

</span>

</h1>





<p className="
mt-10
text-2xl
leading-relaxed
text-red-800
max-w-[800px]
">

Groceries • Fashion • Food • Electronics •
Home Essentials • Pet Care & more ✨

</p>


{/* STATS */}

<div className="
flex
gap-10
mt-12
flex-wrap
">

<div>

<h2 className="
text-4xl
font-black
text-green-600
">

500+

</h2>

<p className="
text-gray-500
font-semibold
">
Stores
</p>

</div>

<div>

<h2 className="
text-4xl
font-black
text-pink-500
">

10K+

</h2>

<p className="
text-gray-500
font-semibold
">
Orders
</p>

</div>

<div>

<h2 className="
text-4xl
font-black
text-orange-500
">

15 min

</h2>

<p className="
text-gray-500
font-semibold
">
Delivery
</p>

</div>

</div>

</div>





{/* RIGHT SIDE */}

<div className="
relative
flex
justify-center
items-center
min-h-[450px]
">

{/* MAIN IMAGE */}

<div className="
relative
w-[420px]
h-[420px]
overflow-hidden
rounded-[45%_55%_60%_40%/40%_45%_55%_60%]
rotate-[6deg]
shadow-[0_25px_80px_rgba(0,0,0,0.25)]
border-[10px]
border-white
hover:rotate-0
transition-all
duration-700
">

<img
src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1400&auto=format&fit=crop"

className="
w-full
h-full
object-cover
hover:scale-110
transition-all
duration-700
"
/>

</div>




{/* PREMIUM FLOATING TAGS */}

<div className="
absolute
top-10
left-[-20px]
bg-white/90
backdrop-blur-xl
px-6
py-4
rounded-[24px]
shadow-[0_15px_40px_rgba(0,0,0,0.15)]
rotate-[-12deg]
font-bold
text-gray-800
border
border-white/40
hover:scale-105
transition
">

🍔 Food

</div>



<div className="
absolute
bottom-12
left-[-10px]
bg-white/90
backdrop-blur-xl
px-6
py-4
rounded-[24px]
shadow-[0_15px_40px_rgba(0,0,0,0.15)]
rotate-[8deg]
font-bold
text-gray-800
border
border-white/40
hover:scale-105
transition
">

🐶 Pet Care

</div>



<div className="
absolute
top-12
right-[-10px]
bg-white/90
backdrop-blur-xl
px-6
py-4
rounded-[24px]
shadow-[0_15px_40px_rgba(0,0,0,0.15)]
rotate-[10deg]
font-bold
text-gray-800
border
border-white/40
hover:scale-105
transition
">

🏠 Home Essentials

</div>



<div className="
absolute
bottom-12
right-[-20px]
bg-white/90
backdrop-blur-xl
px-6
py-4
rounded-[24px]
shadow-[0_15px_40px_rgba(0,0,0,0.15)]
rotate-[-8deg]
font-bold
text-gray-800
border
border-white/40
hover:scale-105
transition
">

🎧 Electronics

</div>

</div>

</div>

</div>

{/* FLASH SALE */}

<div className="
mt-10
flex
justify-center
items-center
relative
">

<div className="
relative
w-full
max-w-[900px]
min-h-[260px]
rounded-[60px]
overflow-hidden
bg-gradient-to-br
from-pink-500
via-fuchsia-500
to-orange-400
shadow-[0_20px_80px_rgba(255,0,120,0.35)]
">

{/* BIG GLOW */}

<div className="
absolute
top-[-120px]
right-[-80px]
w-[300px]
h-[300px]
bg-yellow-300/30
blur-[100px]
rounded-full
"></div>

<div className="
absolute
bottom-[-120px]
left-[-80px]
w-[250px]
h-[250px]
bg-white/20
blur-[90px]
rounded-full
"></div>





{/* FLOATING CIRCLE */}

<div className="
absolute
top-8
left-10
w-24
h-24
rounded-full
bg-white/20
backdrop-blur-xl
border
border-white/60
flex
items-center
justify-center
text-white
font-black
text-xl
animate-bounce
">

70% OFF

</div>


{/* CONTENT */}

<div className="
relative
z-10
flex
flex-col
items-center
justify-center
text-center
h-full
px-8
py-12
">

{/* TAG */}

<div className="
bg-white
text-pink-600
font-black
px-6
py-2
rounded-full
shadow-xl
text-sm
tracking-widest
uppercase
">

⚡ Limited Time Deal

</div>


{/* TITLE */}

<h1 className="
mt-5
text-5xl
md:text-6xl
font-black
text-white
leading-none
drop-shadow-xl
">

FLASH SALE

</h1>

<p className="
mt-4
text-xl
font-semibold
text-pink-100
max-w-[500px]
">

🔥 Crazy discounts on your favorite stores today only

</p>





{/* TIMER + BUTTON */}

<div className="
mt-8
flex
flex-wrap
justify-center
items-center
gap-5
">

{/* TIMER */}

<div className="
bg-black/20
backdrop-blur-2xl
border
border-white/20
px-8
py-4
rounded-[30px]
shadow-2xl
">

<div className="
flex
items-center
gap-4
text-white
">

<div>
<p className="text-xs text-pink-100">HRS</p>
<h2 className="text-3xl font-black">
{hours}
</h2>
</div>

<div className="text-3xl font-black">
:
</div>

<div>
<p className="text-xs text-pink-100">MIN</p>
<h2 className="text-3xl font-black">
{minutes}
</h2>
</div>

<div className="text-3xl font-black">
:
</div>

<div>
<p className="text-xs text-pink-100">SEC</p>
<h2 className="text-3xl font-black">
{seconds}
</h2>
</div>

</div>

</div>



{/* FLOATING EMOJIS */}


<div className="
absolute
bottom-40
left-20
text-7xl
rotate-360
animate-pulse
">

🛒

</div>

<div className="
absolute
top-9
right-40
text-6xl
rotate-12
animate-pulse
">

🛍️

</div>

<div className="
absolute
bottom-10
right-10
text-6xl
rotate-360
animate-pulse
">

💸

</div>


{/* BUTTON */}

<button

onClick={()=>{

window.scrollTo({

top:1200,
behavior:"smooth"

});

}}

className="
bg-white
text-pink-600
font-black
px-8
py-4
rounded-full
shadow-[0_10px_30px_rgba(255,255,255,0.4)]
hover:scale-110
hover:bg-yellow-200
transition-all
duration-300
"

>

🛍 Shop Now

</button>

</div>

</div>

</div>

</div>


{/* SORT + BUTTONS */}

<div className="
flex
justify-center
gap-5
my-10
flex-wrap
">

<select
value={sortBy}
onChange={(e)=>setSortBy(e.target.value)}

className={`
px-6
py-4
rounded-2xl

${darkMode
? "bg-gray-800 text-white"
: "bg-white border"}

`}
>

<option value="default">
Sort By
</option>

<option value="rating">
⭐ Rating
</option>

<option value="name">
🔤 Name
</option>

<option value="delivery">
🚚 Delivery
</option>

</select>


<button
onClick={()=>navigate("/add-shop")}
className="
bg-blue-500
text-white
px-8
py-4
rounded-2xl
font-bold
hover:scale-105
transition
"
>
🏪 Become Seller
</button>


<button
onClick={()=>navigate("/sellerpanel")}
className="
bg-green-500
text-white
px-8
py-4
rounded-2xl
font-bold
hover:scale-105
transition
"
>
👤 Seller Panel
</button>

</div>


{/* CITY FILTER */}

<div className="
flex
gap-3
justify-center
mb-10
flex-wrap
">

{["All","Coimbatore","Madurai","Salem","Tirupur","Erode","Chennai","Trichy"]

.map((city)=>(

<button
key={city}
onClick={()=>setSelectedCity(city)}

className={`

px-6
py-3
rounded-2xl
font-bold
transition

${
selectedCity===city
? "bg-green-500 text-white"

: darkMode
? "bg-gray-800 text-white"
: "bg-white border"
}

`}

>

{city}

</button>

))}

</div>

<h2 className="
text-5xl
font-black
mb-10
">
Nearby Shops
</h2>



<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-8
">

{finalShops.map((shop)=>(

<div
key={shop._id}
id={`shop-${shop._id}`}

className={`

rounded-[30px]
overflow-hidden
shadow-2xl
hover:scale-[1.03]
hover:-translate-y-2
transition-all
duration-300

${darkMode
? "bg-[#0f172a]"
: "bg-white border border-gray-200"}

`}

>

    

<img
src={
shop.image?.startsWith("http")
? shop.image
: getShopImage(shop)
}

onError={(e)=>{
e.target.src=getShopImage(shop)
}}

className="
w-full
h-56
object-cover
"
/>



<div className="p-6">

<h2 className="
text-3xl
font-black
">
{shop.name}
</h2>

<p className="
mt-3
">
📍 {shop.city}
</p>

<p className="
mt-2
text-yellow-500
font-bold
">
⭐ {ratings[shop.category] || 4.7}
</p>

<p className="
mt-2
text-green-500
font-bold
">
🚚 {getDeliveryTime(shop)}
</p>

<div className="
mt-3
">

{

isShopOpen(shop)

?

<p className="
text-green-400
font-bold
text-lg
animate-pulse
">

🟢 Open Now

</p>

:

<p className="
text-red-400
font-bold
text-lg
">

🔴 Closed

</p>

}

</div>

<div className="
bg-purple-500
text-white
rounded-2xl
py-3
mt-5
text-center
font-bold
">
{getOffer(shop)}
</div>



<div className="
grid
grid-cols-2
gap-3
mt-6
">

<button
onClick={()=>toggleFavorite(shop)}
className="
bg-pink-500
text-white
py-3
rounded-2xl
font-bold
"
>

{
favorites.find(
item=>item._id===shop._id
)

? "❤️ Saved"

: "🤍 Save"
}

</button>



<button
onClick={()=>
navigate(`/shop/${shop._id}`)
}

className="
bg-green-500
text-white
py-3
rounded-2xl
font-bold
"
>

🏪 View

</button>



<button
onClick={()=>
deleteShop(shop._id)
}

className="
bg-red-500
text-white
py-3
rounded-2xl
font-bold
"
>

🗑 Delete

</button>



<button
onClick={()=>window.open(
`https://www.google.com/maps/search/${shop.name}+${shop.city}`
)}

className="
bg-cyan-500
text-white
py-3
rounded-2xl
font-bold
"
>

🗺 Map

</button>

</div>

</div>

</div>

))}

</div>

</div>

);
}