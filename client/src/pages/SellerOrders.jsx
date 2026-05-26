import { useEffect,useState } from "react";

export default function SellerOrders(){

const [orders,setOrders]=useState([]);
const [darkMode,setDarkMode]=useState(false);

useEffect(()=>{

const data=
JSON.parse(
localStorage.getItem("orders")
) || [];

const updated=data.map(order=>({

...order,

status:
order.status || "Order Placed"

}));

setOrders(updated);

const theme=
JSON.parse(
localStorage.getItem("darkMode")
);

if(theme!==null){
setDarkMode(theme);
}

},[]);


const updateStatus=(
index,
newStatus
)=>{

const updated=[...orders];

updated[index]={
...updated[index],
status:newStatus
};

setOrders(updated);

localStorage.setItem(
"orders",
JSON.stringify(updated)
);

};


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

<h1 className="
text-5xl
font-bold
mb-10
text-green-500
">

📦 Seller Orders

</h1>


{orders.length===0 ? (

<div className="
flex
justify-center
items-center
h-[60vh]
">

<h2 className="
text-3xl
font-bold
text-gray-400
">

No Orders Yet 😔

</h2>

</div>

):(


<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-8
">

{orders.map((order,index)=>(

<div
key={index}

className={`

rounded-3xl
p-6
shadow-xl
transition-all
duration-300
hover:scale-[1.02]

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}
>

{/* CUSTOMER */}

<div className="
flex
justify-between
items-start
">

<div>

<h2 className="
text-2xl
font-bold
">

👤 {order.name}

</h2>

<p className="
mt-2
text-gray-400
">

📱 {order.phone}

</p>

<p className="
mt-1
text-gray-400
">

🕒 {order.time}

</p>

</div>

<div className="
bg-green-500
text-white
px-4
py-2
rounded-xl
font-bold
text-sm
shadow-lg
">

#{index+1}

</div>

</div>


{/* PAYMENT */}

<div className="
mt-5
">

<p className="
font-semibold
">

💳 Payment:
<span className="
text-green-500
ml-2
">
{order.payment}
</span>

</p>

</div>


{/* PRODUCTS */}

<div className="
mt-6
space-y-4
max-h-72
overflow-y-auto
pr-2
">

{order.items?.map((item,i)=>(

<div
key={i}

className={`

flex
items-center
gap-4
p-4
rounded-2xl

${
darkMode
? "bg-[#1e293b]"
: "bg-gray-50 border border-gray-200"
}

`}
>

<img
src={item.image}
alt={item.name}

className="
w-16
h-16
rounded-xl
object-cover
border
"
/>

<div className="
flex-1
">

<h3 className="
font-bold
text-lg
">

{item.name}

</h3>

<p className={`
text-sm
mt-1

${
darkMode
? "text-gray-300"
: "text-gray-600"
}

`}>

Qty: {item.quantity}

</p>

<p className="
text-green-500
font-semibold
mt-1
">

₹ {item.price}

</p>

</div>

</div>

))}

</div>


{/* STATUS */}

<div className="
mt-6
">

<p className="
font-bold
mb-3
text-lg
">

📌 Update Status

</p>

<select

value={
order.status
}

onChange={(e)=>

updateStatus(
index,
e.target.value
)

}

className={`

w-full
p-3
rounded-2xl
font-semibold
outline-none

${
darkMode
? "bg-gray-800 text-white"
: "bg-gray-100 text-black border border-gray-300"
}

`}
>

<option>Order Placed</option>
<option>Packed</option>
<option>Out for Delivery</option>
<option>Delivered</option>

</select>

</div>


{/* STATUS BADGE */}

<div className="
mt-5
">

<div className={`

w-full
text-center
py-3
rounded-2xl
font-bold
shadow-lg

${
order.status==="Delivered"
? "bg-green-500"

: order.status==="Out for Delivery"
? "bg-yellow-500"

: order.status==="Packed"
? "bg-blue-500"

: "bg-purple-500"
}

text-white

`}>

{order.status}

</div>

</div>

</div>

))}

</div>

)}

</div>

);

}