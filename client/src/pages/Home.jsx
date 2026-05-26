import { Link } from "react-router-dom";

export default function Home(){

return(

<div className="
min-h-screen
bg-[#f3f4f6]
text-black
overflow-hidden
">

{/* NAVBAR */}

<nav className="
bg-white
shadow-md
mx-6
mt-6
rounded-3xl
px-8
py-5
flex
justify-between
items-center
">

<h1 className="
text-5xl
font-black
text-green-500
">
Zoopar
</h1>

<div className="
flex
gap-4
">

<Link to="/login">

<button className="
px-6
py-3
rounded-2xl
border
border-gray-300
font-bold
hover:bg-gray-100
transition
">
Login
</button>

</Link>

<Link to="/register">

<button className="
bg-green-500
hover:bg-green-600
transition
text-white
px-6
py-3
rounded-2xl
font-bold
shadow-lg
">
Register
</button>

</Link>

</div>

</nav>



{/* HERO SECTION */}

<div className="
mx-6
mt-6
rounded-[40px]
bg-gradient-to-r
from-green-500
to-emerald-700
p-12
flex
flex-col
md:flex-row
justify-between
items-center
gap-10
shadow-2xl
">

<div className="max-w-2xl">

<h1 className="
text-6xl
font-black
leading-tight
text-white
">

Delivering local shops ⚡

</h1>

<p className="
mt-6
text-2xl
text-green-100
leading-relaxed
">

Support nearby businesses across Tamil Nadu with fast delivery and smart shopping experience.

</p>



<div className="
flex
gap-5
mt-10
flex-wrap
">

<button

onClick={()=>
window.location="/dashboard"
}

className="
bg-white
text-black
px-10
py-4
rounded-2xl
font-bold
hover:scale-105
transition-all
shadow-xl
"
>

🛍 Explore Stores

</button>



<button

onClick={()=>
window.location="/add-shop"
}

className="
bg-black/20
backdrop-blur-md
border
border-white/20
text-white
px-10
py-4
rounded-2xl
font-bold
hover:scale-105
transition-all
shadow-xl
"
>

🏪 Become Seller

</button>

</div>

</div>



<img
src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1200&auto=format&fit=crop"
className="
w-full
md:w-[420px]
h-[300px]
object-cover
rounded-3xl
shadow-2xl
"
/>

</div>



{/* FEATURES */}

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-8
px-6
mt-14
pb-20
">

<div className="
bg-white
rounded-3xl
p-8
shadow-xl
hover:scale-105
transition-all
">

<div className="text-5xl">
📍
</div>

<h2 className="
text-3xl
font-black
mt-5
">
Nearby Shops
</h2>

<p className="
mt-4
text-gray-600
leading-relaxed
">
Discover local stores instantly based on your city and preferences.
</p>

</div>



<div className="
bg-white
rounded-3xl
p-8
shadow-xl
hover:scale-105
transition-all
">

<div className="text-5xl">
⚡
</div>

<h2 className="
text-3xl
font-black
mt-5
">
Fast Delivery
</h2>

<p className="
mt-4
text-gray-600
leading-relaxed
">
Quick product delivery from trusted nearby shops.
</p>

</div>



<div className="
bg-white
rounded-3xl
p-8
shadow-xl
hover:scale-105
transition-all
">

<div className="text-5xl">
❤️
</div>

<h2 className="
text-3xl
font-black
mt-5
">
Support Local
</h2>

<p className="
mt-4
text-gray-600
leading-relaxed
">
Empowering Tamil Nadu small businesses through digital commerce.
</p>

</div>

</div>

</div>

);

}