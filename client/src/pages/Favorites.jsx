import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {

const navigate = useNavigate();

const [favorites, setFavorites] = useState([]);
const [darkMode, setDarkMode] = useState(false);



/* ================= LOAD THEME ================= */

useEffect(() => {

const savedTheme =
JSON.parse(
localStorage.getItem("darkMode")
);

if(savedTheme !== null){

setDarkMode(savedTheme);

}

}, []);




/* ================= LOAD FAVORITES ================= */

useEffect(() => {

const data =
JSON.parse(
localStorage.getItem("favorites")
) || [];



const cleanedData =
data.map((shop) => ({

...shop,

image:

shop.image &&
shop.image.startsWith("http") &&
!shop.image.includes("dummyimage") &&
!shop.image.includes("Shop+Image")

? shop.image

: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"

}));



setFavorites(cleanedData);



localStorage.setItem(
"favorites",
JSON.stringify(cleanedData)
);

}, []);





/* ================= REMOVE FAVORITE ================= */

const removeFavorite = (index) => {

const updated =
favorites.filter(
(_, i) => i !== index
);

setFavorites(updated);

localStorage.setItem(
"favorites",
JSON.stringify(updated)
);

};





/* ================= CLEAR ALL ================= */

const clearAll = () => {

localStorage.removeItem("favorites");

setFavorites([]);

};





return (

<div className={`

min-h-screen
p-6
md:p-10
transition-all

${darkMode
? "bg-[#020617] text-white"
: "bg-gray-100 text-black"
}

`}>



{/* ================= HEADER ================= */}

<div className="
flex
justify-between
items-center
flex-wrap
gap-5
mb-12
">

<div>

<h1 className="
text-5xl
font-black
text-pink-500
">
❤️ Favorite Shops
</h1>

<p className={`
mt-3
text-lg

${darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>
Your saved favorite stores ✨
</p>

</div>



<div className="
flex
gap-4
flex-wrap
">

<button

onClick={() => navigate("/dashboard")}

className="
bg-green-500
hover:bg-green-600
text-white
px-6
py-3
rounded-2xl
font-bold
shadow-xl
transition-all
duration-300
hover:scale-105
"

>

⬅ Dashboard

</button>



{
favorites.length > 0 && (

<button

onClick={clearAll}

className="
bg-red-500
hover:bg-red-600
text-white
px-6
py-3
rounded-2xl
font-bold
shadow-xl
transition-all
duration-300
hover:scale-105
"

>

🗑 Clear All

</button>

)
}

</div>

</div>






{/* ================= EMPTY STATE ================= */}

{
favorites.length === 0 ? (

<div className="
flex
flex-col
items-center
justify-center
text-center
mt-24
">

<h2 className="
text-8xl
mb-6
">
💔
</h2>

<h3 className="
text-4xl
font-black
">
No Favorites Yet
</h3>

<p className={`
mt-4
text-lg

${darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>
Save your favorite shops to see them here
</p>

<button

onClick={() => navigate("/dashboard")}

className="
mt-8
bg-pink-500
hover:bg-pink-600
text-white
px-8
py-4
rounded-2xl
font-bold
shadow-xl
transition-all
hover:scale-105
"

>

🛍 Explore Shops

</button>

</div>

) : (



/* ================= FAVORITE CARDS ================= */

<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
2xl:grid-cols-4
gap-8
">

{favorites.map((shop, index) => (

<div
key={index}

className={`

rounded-[30px]
overflow-hidden
shadow-2xl
transition-all
duration-300
hover:scale-[1.03]
group

${darkMode
? "bg-[#0f172a]"
: "bg-white border border-gray-200"
}

`}
>




{/* ================= IMAGE ================= */}

<div className="
relative
overflow-hidden
">

<img

src={shop.image}

alt={shop.name}

onError={(e) => {

e.target.onerror = null;

e.target.src =
"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop";

}}

className="
w-full
h-64
object-cover
transition-all
duration-500
group-hover:scale-110
"
/>

<div className="
absolute
top-4
right-4
bg-pink-500
text-white
px-4
py-2
rounded-full
font-bold
shadow-lg
">

❤️ Favorite

</div>

</div>






{/* ================= DETAILS ================= */}

<div className="p-6">

<h2 className="
text-3xl
font-black
truncate
">

{shop.name}

</h2>



<p className={`
mt-3
text-lg

${darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>

📍 {shop.city || "Unknown City"}

</p>



<div className="
mt-4
inline-block
bg-green-500/20
text-green-500
px-4
py-2
rounded-full
font-bold
">

🏷 {shop.category || "Shop"}

</div>






{/* ================= BUTTONS ================= */}

<div className="
flex
gap-4
mt-8
">

<button

onClick={() =>
navigate(`/shop/${shop._id}`)
}

className="
flex-1
bg-green-500
hover:bg-green-600
text-white
py-3
rounded-2xl
font-bold
transition-all
hover:scale-105
"

>

🛒 View

</button>



<button

onClick={() =>
removeFavorite(index)
}

className="
flex-1
bg-red-500
hover:bg-red-600
text-white
py-3
rounded-2xl
font-bold
transition-all
hover:scale-105
"

>

❌ Remove

</button>

</div>

</div>

</div>

))}

</div>

)}

</div>

);

}