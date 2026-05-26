import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {

const navigate=useNavigate();

const [orders,setOrders]=useState([]);

const steps=[
"Order Placed",
"Preparing 🍳",
"Picked Up 🛵",
"Near You 📍",
"Delivered ✅"
];


/* LOAD ORDERS */

useEffect(()=>{

const data=
JSON.parse(
localStorage.getItem("orders")
) || [];

const formatted=data.map((order)=>({

...order,

status:
order.status || "Order Placed",

estimatedTime:
order.estimatedTime || 20

}));

setOrders(formatted);

},[]);



/* TIMER + STATUS */

useEffect(()=>{

if(orders.length===0){
return;
}

const interval=setInterval(()=>{

setOrders((prev)=>{

const updated=prev.map((order)=>{

let newTime=
order.estimatedTime;

if(
order.status!=="Delivered ✅"
){

newTime=
Math.max(
order.estimatedTime-1,
0
);

}

let newStatus=
order.status;

if(newTime<=15){

newStatus="Preparing 🍳";

}

if(newTime<=10){

newStatus="Picked Up 🛵";

}

if(newTime<=5){

newStatus="Near You 📍";

}

if(newTime<=0){

newStatus="Delivered ✅";

}

return{

...order,

estimatedTime:newTime,

status:newStatus

};

});

localStorage.setItem(
"orders",
JSON.stringify(updated)
);

return updated;

});

},1000);

return ()=>clearInterval(interval);

},[orders.length]);



const getStep=(status)=>{

return steps.indexOf(status);

};



const deleteOrder=(index)=>{

const updated=
orders.filter(
(_,i)=>i!==index
);

setOrders(updated);

localStorage.setItem(
"orders",
JSON.stringify(updated)
);

};



return(

<div className="
min-h-screen
bg-gray-100
p-8
">

<h1 className="
text-5xl
font-black
text-green-500
mb-10
">

📦 My Orders

</h1>


{orders.length===0 ? (

<div className="
h-[60vh]
flex
items-center
justify-center
">

<h2 className="
text-3xl
font-bold
text-gray-400
">

No orders found 😔

</h2>

</div>

):(


orders.map((order,index)=>(

<div
key={index}

className="
bg-white
p-8
rounded-[30px]
shadow-2xl
mb-10
"
>

{/* HEADER */}

<div className="
flex
justify-between
items-center
">

<div>

<h2 className="
text-3xl
font-black
">

🧾 Order #{index+1}

</h2>

<div className="
mt-5
space-y-2
">

<p>
👤 {order.name}
</p>

<p>
📱 {order.phone}
</p>

<p>
💳 {order.payment}
</p>

<p>
🕒 {order.time}
</p>

</div>

</div>


<button

onClick={()=>
deleteOrder(index)
}

className="
bg-red-500
hover:bg-red-600
text-white
px-5
py-3
rounded-2xl
font-bold
transition
hover:scale-105
"

>

🗑 Delete

</button>

</div>



{/* ESTIMATE */}

<div className="
mt-8
border
border-orange-400
bg-orange-100
rounded-3xl
p-5
flex
justify-between
items-center
">

<div>

<p className="
text-orange-500
font-bold
text-xl
">

⏱ Estimated Delivery

</p>

<h2 className="
text-4xl
font-black
mt-2
">

{
order.status==="Delivered ✅"

? "Delivered 🎉"

: `${order.estimatedTime} sec`
}

</h2>

</div>


<div className="
w-20
h-20
rounded-full
border-4
border-orange-400
flex
items-center
justify-center
text-3xl
font-black
text-orange-500
">

{
order.status==="Delivered ✅"

? "✓"

: order.estimatedTime
}

</div>

</div>



{/* CURRENT STATUS */}

<h2 className="
mt-8
text-3xl
font-black
text-green-500
">

🚚 Current: {order.status}

</h2>



{/* TRACKER */}

<div className="
flex
justify-between
items-center
relative
mt-12
">

<div className="
absolute
top-6
left-0
w-full
h-1
bg-gray-300
">
</div>


<div

className="
absolute
top-6
left-0
h-1
bg-green-500
transition-all
duration-1000
"

style={{
width:
`${(getStep(order.status)/4)*100}%`
}}

>
</div>


{steps.map((step,i)=>(

<div
key={i}

className="
relative
z-10
flex
flex-col
items-center
"
>

<div

className={`

w-14
h-14
rounded-full
flex
items-center
justify-center
text-white
font-black
text-xl
transition-all
duration-500

${
i<getStep(order.status)

? "bg-green-500"

: i===getStep(order.status)

? "bg-green-500 animate-pulse scale-110 ring-4 ring-green-300"

: "bg-gray-500"
}

`}

>

{i+1}

</div>

<p className="
mt-3
font-bold
text-center
w-24
">

{step}

</p>

</div>

))}

</div>



{/* BIKE */}

{
order.status!=="Delivered ✅" && (

<div className="
relative
overflow-hidden
h-16
mt-10
">

<div className="
absolute
text-5xl
animate-[bikeMove_4s_linear_infinite]
">

🛵

</div>

</div>

)
}



{/* DELIVERED BUTTONS */}

{
order.status==="Delivered ✅" && (

<div className="
flex
justify-center
gap-5
mt-10
flex-wrap
">

<button

onClick={()=>{
navigate("/dashboard");
}}

className="
bg-green-500
hover:bg-green-600
text-white
px-8
py-4
rounded-2xl
font-bold
transition
hover:scale-105
"

>

🏠 Back To Dashboard

</button>


<button

onClick={()=>{

localStorage.setItem(
"cart",
JSON.stringify(order.items)
);

window.dispatchEvent(
new Event("cartUpdated")
);

navigate("/cart");

}}

className="
bg-orange-500
hover:bg-orange-600
text-white
px-8
py-4
rounded-2xl
font-bold
transition
hover:scale-105
"

>

🔁 Order Again

</button>

</div>

)
}



{/* ITEMS */}

<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
mt-10
">

{order.items?.map((item,i)=>(

<div
key={i}

className="
p-5
rounded-3xl
bg-gray-100
flex
items-center
gap-5
"
>

<img
src={item.image}

className="
w-24
h-24
rounded-2xl
object-cover
"
/>

<div>

<h2 className="
text-2xl
font-black
">

{item.name}

</h2>

<p>
Qty: {item.quantity}
</p>

<p className="
text-green-500
font-black
text-xl
">

₹ {item.price}

</p>

</div>

</div>

))}

</div>

</div>

))

)}



<style>
{`

@keyframes bikeMove {

0%{
left:-10%;
}

100%{
left:100%;
}

}

`}
</style>

</div>

);

}