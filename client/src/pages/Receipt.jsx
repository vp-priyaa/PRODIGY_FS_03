import {useEffect,useState} from "react";

export default function Receipt(){

const [order,setOrder]=useState(null);

useEffect(()=>{

const orders=
JSON.parse(
localStorage.getItem("orders")
)||[];

setOrder(
orders[orders.length-1]
);

},[]);

if(!order){

return(
<div className="
text-white
p-10
">
No receipt found
</div>
);

}

const total=
order.items.reduce(

(sum,item)=>

sum+
(
item.price*
(item.quantity || 1)
),

0

);

return(

<div className="
min-h-screen
bg-black
text-white
flex
justify-center
items-center
p-10
">

<div className="
bg-white
text-black
w-[700px]
rounded-3xl
p-8
shadow-2xl
">

<h1 className="
text-4xl
font-bold
text-center
mb-4
">
Zoopar Receipt
</h1>

<hr/>

<p className="mt-4">
👤 {order.name}
</p>

<p>
📞 {order.phone}
</p>

<p>
📍 {order.address}
</p>

<p>
💳 {order.payment}
</p>

<p>
🕒 {order.time}
</p>

<hr className="my-4"/>

{order.items.map((item,index)=>(

<div
key={index}
className="
flex
justify-between
py-2
"
>

<p>
{item.name}
x {item.quantity || 1}
</p>

<p>
₹{
item.price*
(item.quantity || 1)
}
</p>

</div>

))}

<hr className="my-4"/>

<h2 className="
text-2xl
font-bold
text-right
">
Total ₹{total}
</h2>

<button
onClick={()=>window.print()}
className="
bg-green-500
text-white
px-6
py-3
rounded-xl
mt-6
w-full
"
>
🖨 Print Receipt
</button>

</div>

</div>

);

}