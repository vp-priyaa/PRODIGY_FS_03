import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout(){

const navigate=useNavigate();

const [name,setName]=useState("");
const [phone,setPhone]=useState("");
const [address,setAddress]=useState("");

const [payment,setPayment]=
useState("COD");

const [darkMode,setDarkMode]=
useState(false);

const [loading,setLoading]=
useState(false);

useEffect(()=>{

const saved=
JSON.parse(
localStorage.getItem(
"darkMode"
)
);

if(saved!==null){

setDarkMode(saved);

}

},[]);



const finishOrder=()=>{

const cartItems=
JSON.parse(
localStorage.getItem(
"cart"
)
)||[];

const order={

name,
phone,
address,
payment,

status:
"Order Placed",

items:
cartItems.map(item=>({

...item,

quantity:
item.quantity || 1

})),

time:
new Date()
.toLocaleString(),

estimatedTime:
Math.floor(Math.random()*20)+10

};


const existing=
JSON.parse(
localStorage.getItem(
"orders"
)
)||[];


existing.push(order);

localStorage.setItem(
"orders",
JSON.stringify(existing)
);


/* REALTIME UPDATE */

window.dispatchEvent(
new Event("ordersUpdated")
);


/* CLEAR CART */

localStorage.removeItem(
"cart"
);

window.dispatchEvent(
new Event("cartUpdated")
);


/* GO TO ORDERS PAGE */

navigate("/orders");

};



const placeOrder=()=>{

if(
!name ||
!phone ||
!address
){

alert(
"Fill all fields"
);

return;

}


if(payment==="COD"){

finishOrder();

return;

}


setLoading(true);


setTimeout(()=>{

setLoading(false);

alert(
"✅ Payment Success"
);

finishOrder();

},3000);

};



return(

<div className={`

min-h-screen
flex
justify-center
items-start
py-10
px-6

${
darkMode
?
"bg-black text-white"
:
"bg-gray-100 text-black"
}

`}>



<div className={`

w-[750px]
max-h-[90vh]
overflow-y-auto
p-10
rounded-3xl

${
darkMode
?
"bg-[#111827]"
:
"bg-white"
}

shadow-2xl

`}>


<h1 className="
text-5xl
font-black
text-green-500
mb-8
">

💳 Checkout

</h1>


<input
placeholder="Name"

value={name}

onChange={(e)=>
setName(
e.target.value
)
}

className="
w-full
border
p-4
rounded-2xl
text-black
mb-4
outline-none
"
/>



<input
placeholder="Phone"

value={phone}

onChange={(e)=>
setPhone(
e.target.value
)
}

className="
w-full
border
p-4
rounded-2xl
text-black
mb-4
outline-none
"
/>



<textarea

placeholder="Address"

value={address}

onChange={(e)=>
setAddress(
e.target.value
)
}

className="
w-full
border
p-4
rounded-2xl
text-black
mb-5
outline-none
"
/>



<select
value={payment}
onChange={(e)=>setPayment(e.target.value)}

className="
w-full
border
p-4
rounded-2xl
bg-white
text-black
mb-5
outline-none
"
>

<option value="COD">
Cash On Delivery
</option>

<option value="UPI">
UPI
</option>

<option value="Card">
Card
</option>

<option value="Wallet">
Wallet
</option>

</select>



{payment==="UPI" ? (

<input
placeholder="Enter UPI ID"

className="
w-full
border
p-4
rounded-2xl
text-black
mb-5
outline-none
"
/>

):null}




{payment==="Card" ? (

<>

<input
placeholder="Card Number"

className="
w-full
border
p-4
rounded-2xl
text-black
mb-3
outline-none
"/>

<div className="
flex
gap-4
">

<input
placeholder="MM/YY"

className="
w-1/2
border
p-4
rounded-2xl
text-black
mb-5
outline-none
"/>


<input
placeholder="CVV"

className="
w-1/2
border
p-4
rounded-2xl
text-black
mb-5
outline-none
"/>

</div>

</>

):null}




{payment==="Wallet" ? (

<select
className="
w-full
border
p-4
rounded-2xl
text-black
mb-5
outline-none
">

<option>
Paytm
</option>

<option>
PhonePe
</option>

<option>
Amazon Pay
</option>

</select>

):null}




<button

onClick={placeOrder}

disabled={loading}

className="

w-full
bg-green-500
hover:bg-green-600
py-4
rounded-2xl
font-bold
text-xl
transition-all
duration-300
hover:scale-[1.02]

"

>

{

loading

?

"⏳ Processing..."

:

"Place Order 🚀"

}

</button>




{loading &&(

<div className="
mt-5
text-center
text-green-500
animate-pulse
text-xl
font-bold
">

💳 Processing Secure Payment...

</div>

)}

</div>

</div>

);

}