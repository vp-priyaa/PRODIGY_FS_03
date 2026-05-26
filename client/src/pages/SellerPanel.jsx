import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

export default function SellerPanel(){

const navigate=useNavigate();

const [darkMode,setDarkMode]=useState(false);

useEffect(()=>{

const theme=
JSON.parse(
localStorage.getItem("darkMode")
);

if(theme!==null){
setDarkMode(theme);
}

},[]);


const cards=[

{
title:"Products",
icon:"🛒",
color:"from-green-500 to-emerald-600",
path:"/seller/products",
desc:"Manage all your shop products"
},

{
title:"Orders",
icon:"📦",
color:"from-blue-500 to-cyan-600",
path:"/seller/orders",
desc:"Track customer orders"
},

{
title:"Analytics",
icon:"📊",
color:"from-purple-500 to-pink-600",
path:"/seller/analytics",
desc:"View sales insights"
},

{
title:"Seller Info",
icon:"👤",
color:"from-orange-500 to-yellow-500",
path:"/seller/info",
desc:"Update seller profile"
},

{
title:"Chat",
icon:"💬",
color:"from-pink-500 to-rose-600",
path:"/seller/chat",
desc:"Chat with customers"
}

];


return(

<div className={`

min-h-screen
p-10

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
mb-12
flex-wrap
gap-5
">

<div>

<h1 className="
text-5xl
font-black
">

🏪 Seller Panel

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

Manage products, orders, analytics and customers

</p>

</div>


<button

onClick={()=>{
navigate("/dashboard");
}}

className="

bg-red-500
hover:bg-red-600
transition-all
px-6
py-3
rounded-2xl
font-bold
shadow-lg

"

>

⬅ Back

</button>

</div>



{/* STATS */}

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mb-12
">

<div className={`

rounded-3xl
p-6
shadow-xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

<h2 className="
text-lg
font-semibold
text-gray-400
">
Total Orders
</h2>

<p className="
text-4xl
font-black
mt-3
text-green-500
">
24
</p>

</div>


<div className={`

rounded-3xl
p-6
shadow-xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

<h2 className="
text-lg
font-semibold
text-gray-400
">
Products
</h2>

<p className="
text-4xl
font-black
mt-3
text-blue-500
">
18
</p>

</div>


<div className={`

rounded-3xl
p-6
shadow-xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

<h2 className="
text-lg
font-semibold
text-gray-400
">
Revenue
</h2>

<p className="
text-4xl
font-black
mt-3
text-purple-500
">
₹12K
</p>

</div>

</div>



{/* MAIN CARDS */}

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-8
">

{cards.map((card,index)=>(

<div
key={index}

onClick={()=>
navigate(card.path)
}

className={`

cursor-pointer
rounded-3xl
p-8
shadow-2xl
transition-all
duration-300
hover:scale-[1.03]
hover:-translate-y-1

bg-gradient-to-br
${card.color}

text-white

`}
>

<div className="
text-6xl
mb-5
">

{card.icon}

</div>

<h2 className="
text-3xl
font-black
">

{card.title}

</h2>

<p className="
mt-4
text-white/90
text-lg
leading-relaxed
">

{card.desc}

</p>

<div className="
mt-8
flex
justify-end
">

<div className="
bg-white/20
px-4
py-2
rounded-xl
font-bold
backdrop-blur-md
">

Open →

</div>

</div>

</div>

))}

</div>



{/* FOOTER */}

<div className="
mt-16
text-center
">

<p className={`
text-sm

${
darkMode
? "text-gray-500"
: "text-gray-500"
}

`}>

Zoopar Seller Dashboard • Manage your business smarter 🚀

</p>

</div>

</div>

);

}