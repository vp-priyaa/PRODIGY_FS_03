import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderHistory(){

const navigate=useNavigate();

const [orders,setOrders]=useState([]);
const [darkMode,setDarkMode]=useState(false);

useEffect(()=>{

const data=
JSON.parse(
localStorage.getItem("orders")
) || [];

const deliveredOrders=
data.filter(
order=>order.status==="Delivered ✅"
);

setOrders(deliveredOrders);

const theme=
JSON.parse(
localStorage.getItem("darkMode")
);

if(theme!==null){

setDarkMode(theme);

}

},[]);


const reorder=(items)=>{

const existingCart=
JSON.parse(
localStorage.getItem("cart")
) || [];

const updatedCart=[
...existingCart,
...items
];

localStorage.setItem(
"cart",
JSON.stringify(updatedCart)
);

window.dispatchEvent(
new Event("cartUpdated")
);

alert(
"Items added to cart 🛒"
);

navigate("/cart");

};


const downloadInvoice=(order,index)=>{

const invoice=`

=========================
        ZOOPAR
=========================

Invoice #${index+1}

Customer:
${order.name}

Phone:
${order.phone}

Payment:
${order.payment}

Delivered Date:
${order.time}

-------------------------

${order.items.map(item=>

`${item.name}
x${item.quantity}

₹${item.price}

`

).join("\n")}

-------------------------

Total:
₹${order.items.reduce(

(sum,item)=>

sum+
(item.price*
(item.quantity || 1)),

0

)}

=========================

Thank You ❤️

`;

const blob=
new Blob([invoice],{
type:"text/plain"
});

const link=
document.createElement("a");

link.href=
URL.createObjectURL(blob);

link.download=
`invoice-${index+1}.txt`;

link.click();

};


return(

<div className={`

min-h-screen
p-8

${darkMode
? "bg-black text-white"
: "bg-gray-100 text-black"}

`}>

<h1 className="
text-5xl
font-bold
text-green-500
mb-10
">

📦 Order History

</h1>


{orders.length===0 ? (

<div className="
flex
justify-center
items-center
h-[50vh]
">

<h2 className="
text-3xl
font-bold
text-gray-400
">

No delivered orders 😔

</h2>

</div>

):(


<div className="
grid
grid-cols-1
md:grid-cols-2
gap-8
">

{orders.map((order,index)=>(

<div
key={index}

className={`

rounded-3xl
p-8
shadow-2xl
transition-all
hover:scale-[1.02]

${darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"}

`}

>

<div className="
flex
justify-between
items-center
">

<h2 className="
text-2xl
font-black
">

🧾 Invoice #{index+1}

</h2>

<p className="
text-green-500
font-bold
">

✅ Delivered

</p>

</div>


<p className="
mt-4
text-lg
">

👤 {order.name}

</p>

<p className="mt-2">

📱 {order.phone}

</p>

<p className="mt-2">

💳 {order.payment}

</p>

<p className="
mt-2
text-orange-500
font-bold
">

📅 Delivered On:
{order.time}

</p>


<div className="
mt-6
space-y-4
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

${darkMode
? "bg-[#1e293b]"
: "bg-gray-100"}

`}

>

<img
src={item.image}

className="
w-20
h-20
rounded-xl
object-cover
"
/>

<div>

<h3 className="
text-lg
font-bold
">

{item.name}

</h3>

<p>

Qty:
{item.quantity}

</p>

<p className="
text-green-500
font-bold
">

₹ {item.price}

</p>

</div>

</div>

))}

</div>


<div className="
grid
grid-cols-2
gap-4
mt-8
">

<button

onClick={()=>
reorder(order.items)
}

className="
bg-green-500
py-3
rounded-2xl
font-bold
hover:scale-105
transition
"

>

🔄 Reorder

</button>


<button

onClick={()=>
downloadInvoice(order,index)
}

className="
bg-purple-500
py-3
rounded-2xl
font-bold
hover:scale-105
transition
"

>

📄 Invoice

</button>

</div>

</div>

))}

</div>

)}

</div>

);

}