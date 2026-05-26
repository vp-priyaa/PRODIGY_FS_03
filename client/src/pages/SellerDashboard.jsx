import {useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";

export default function SellerDashboard(){

const navigate=useNavigate();

const [darkMode,setDarkMode]=useState(false);

const [ordersCount,setOrdersCount]=useState(0);
const [productsCount,setProductsCount]=useState(0);
const [revenue,setRevenue]=useState(0);

useEffect(()=>{

const theme=
JSON.parse(
localStorage.getItem("darkMode")
);

if(theme!==null){

setDarkMode(theme);

}


const orders=
JSON.parse(
localStorage.getItem("orders")
) || [];

const products=
JSON.parse(
localStorage.getItem("sellerProducts")
) || [];

setOrdersCount(
orders.length
);

setProductsCount(
products.length
);


let total=0;

orders.forEach(order=>{

order.items?.forEach(item=>{

total+=
(item.price || 0) *
(item.quantity || 1);

});

});

setRevenue(total);

},[]);



const cards=[

{
title:"Orders",
value:ordersCount,
icon:"📦",
color:"from-blue-500 to-cyan-600"
},

{
title:"Revenue",
value:`₹${revenue}`,
icon:"💰",
color:"from-green-500 to-emerald-600"
},

{
title:"Rating",
value:"4.8 ⭐",
icon:"⭐",
color:"from-yellow-500 to-orange-500"
},

{
title:"Products",
value:productsCount,
icon:"🛒",
color:"from-purple-500 to-pink-600"
}

];



const actions=[

{
title:"Manage Products",
icon:"🛒",
path:"/seller/products",
color:"from-green-500 to-emerald-600"
},

{
title:"Manage Orders",
icon:"📦",
path:"/seller/orders",
color:"from-blue-500 to-cyan-600"
},

{
title:"Analytics",
icon:"📊",
path:"/seller/analytics",
color:"from-purple-500 to-pink-600"
},

{
title:"Profile",
icon:"👤",
path:"/seller/info",
color:"from-pink-500 to-rose-600"
},

{
title:"Customer Chat",
icon:"💬",
path:"/seller/chat",
color:"from-orange-500 to-red-500"
},

{
title:"Back Dashboard",
icon:"⬅",
path:"/dashboard",
color:"from-gray-700 to-gray-900"
}

];



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
mb-12
">

<div>

<h1 className="
text-5xl
font-black
">
🏪 Seller Dashboard
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

Manage your shop smarter with Zoopar 🚀

</p>

</div>


<button

onClick={()=>
navigate("/dashboard")
}

className="
bg-red-500
hover:bg-red-600
transition-all
px-6
py-3
rounded-2xl
font-bold
shadow-xl
"

>

⬅ Back

</button>

</div>





{/* STATS */}

<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
mb-12
">

{cards.map((card,index)=>(

<div
key={index}

className={`

rounded-3xl
p-8
shadow-2xl
bg-gradient-to-br
${card.color}

text-white
hover:scale-[1.02]
transition-all
duration-300

`}
>

<div className="
flex
justify-between
items-center
">

<div>

<p className="
text-lg
font-semibold
text-white/80
">

{card.title}

</p>

<h2 className="
text-4xl
font-black
mt-3
">

{card.value}

</h2>

</div>

<div className="
text-5xl
">

{card.icon}

</div>

</div>

</div>

))}

</div>





{/* ACTION BUTTONS */}

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-8
">

{actions.map((action,index)=>(

<div
key={index}

onClick={()=>
navigate(action.path)
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
${action.color}

text-white

`}
>

<div className="
text-6xl
mb-6
">

{action.icon}

</div>

<h2 className="
text-3xl
font-black
">

{action.title}

</h2>

<p className="
mt-4
text-lg
text-white/90
">

Open and manage your seller activities

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





{/* RECENT ACTIVITY */}

<div className={`

mt-16
rounded-3xl
p-8
shadow-2xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

<h2 className="
text-3xl
font-black
mb-8
">
📈 Recent Activity
</h2>


<div className="
space-y-5
">

<div className="
flex
justify-between
items-center
border-b
border-gray-700
pb-4
">

<p>
🛒 New order received
</p>

<span className="
text-green-500
font-bold
">
2 mins ago
</span>

</div>


<div className="
flex
justify-between
items-center
border-b
border-gray-700
pb-4
">

<p>
📦 Product stock updated
</p>

<span className="
text-blue-500
font-bold
">
10 mins ago
</span>

</div>


<div className="
flex
justify-between
items-center
border-b
border-gray-700
pb-4
">

<p>
⭐ Customer gave 5 star rating
</p>

<span className="
text-yellow-500
font-bold
">
30 mins ago
</span>

</div>


<div className="
flex
justify-between
items-center
">

<p>
💰 Revenue increased today
</p>

<span className="
text-purple-500
font-bold
">
Today
</span>

</div>

</div>

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

Zoopar Seller Dashboard • Built for smart business 🚀

</p>

</div>

</div>

);

}