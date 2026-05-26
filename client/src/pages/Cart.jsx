import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {

const navigate=useNavigate();

const [cart,setCart]=useState([]);
const [coupon,setCoupon]=useState("");
const [discount,setDiscount]=useState(0);
const [darkMode,setDarkMode]=useState(false);

const [cartMessage,setCartMessage]=useState("");



/* LOAD THEME */

useEffect(()=>{

const savedTheme=
JSON.parse(
localStorage.getItem("darkMode")
);

if(savedTheme!==null){

setDarkMode(savedTheme);

}

},[]);



/* LOAD CART */

useEffect(()=>{

const items=
JSON.parse(
localStorage.getItem("cart")
) || [];

setCart(items);

},[]);




/* TOTAL */

const total=cart.reduce(

(sum,item)=>

sum+
(
(item.price || 0)*
(item.quantity || 1)
),

0

);




/* REMOVE ITEM */

const removeFromCart=(index)=>{

const existingCart=
JSON.parse(
localStorage.getItem("cart")
) || [];

existingCart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(existingCart)
);

setCart([...existingCart]);

window.dispatchEvent(
new Event("cartUpdated")
);

setCartMessage(
"Item removed from cart ❌"
);

setTimeout(()=>{

setCartMessage("");

},2000);

};




/* APPLY COUPON */

const applyCoupon=()=>{

const code=
coupon.trim().toUpperCase();

if(code==="SAVE50"){

setDiscount(50);

alert("₹50 discount applied ✅");

}

else if(code==="FIRST20"){

setDiscount(total*0.2);

alert("20% OFF applied ✅");

}

else{

alert("Invalid coupon ❌");

}

};




/* UPDATE QUANTITY */

const updateQuantity=(index,type)=>{

const updated=[...cart];

if(type==="inc"){

updated[index].quantity=
(updated[index].quantity || 1)+1;

}

if(
type==="dec" &&
(updated[index].quantity || 1)>1
){

updated[index].quantity--;

}

setCart(updated);

localStorage.setItem(
"cart",
JSON.stringify(updated)
);

window.dispatchEvent(
new Event("cartUpdated")
);

};




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



{/* TOP MESSAGE */}

{cartMessage && (

<div className="
fixed
top-5
right-5
bg-red-500
text-white
px-6
py-3
rounded-2xl
shadow-2xl
z-50
animate-bounce
font-bold
">

{cartMessage}

</div>

)}




{/* HEADER */}

<div className="
flex
justify-between
items-center
mb-10
flex-wrap
gap-5
">

<div>

<h1 className="
text-5xl
font-black
text-green-500
">
🛒 My Cart
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

{cart.length} items added in your cart

</p>

</div>



<button

onClick={()=>navigate("/dashboard")}

className="
bg-green-500
hover:bg-green-600
transition-all
duration-300
px-6
py-3
rounded-2xl
font-bold
shadow-xl
hover:scale-105
"

>

⬅ Continue Shopping

</button>

</div>





{/* EMPTY CART */}

{cart.length===0 ? (

<div className={`

rounded-3xl
p-16
text-center
shadow-2xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

<h2 className="
text-4xl
font-black
mb-5
">
🛒 Your Cart is Empty
</h2>

<p className={`
text-lg

${
darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>

Looks like you haven’t added anything yet

</p>

<button

onClick={()=>navigate("/dashboard")}

className="
mt-8
bg-green-500
hover:bg-green-600
px-8
py-4
rounded-2xl
font-bold
transition-all
duration-300
hover:scale-105
"

>

Explore Shops 🚀

</button>

</div>

):(



<>

{/* CART GRID */}

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-8
">

{cart.map((item,index)=>(

<div
key={index}

className={`

rounded-3xl
overflow-hidden
shadow-2xl
hover:scale-[1.03]
transition-all
duration-300

${
darkMode
? "bg-[#111827] text-white"
: "bg-white text-black border border-gray-200"
}

`}
>

<img
src={item.image}
alt={item.name}

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
{item.name}
</h2>

<p className="
mt-3
text-green-500
font-bold
text-xl
">
₹{item.price}
</p>



{/* QUANTITY */}

<div className="
flex
items-center
gap-5
mt-6
">

<button

onClick={()=>
updateQuantity(index,"dec")
}

className="
bg-red-500
hover:bg-red-600
w-10
h-10
rounded-full
font-bold
text-xl
transition
"

>

−

</button>


<span className="
text-2xl
font-bold
">
{item.quantity || 1}
</span>


<button

onClick={()=>
updateQuantity(index,"inc")
}

className="
bg-green-500
hover:bg-green-600
w-10
h-10
rounded-full
font-bold
text-xl
transition
"

>

+

</button>

</div>



<p className="
mt-5
text-lg
font-semibold
">

Total:
₹{
(item.price || 0)*
(item.quantity || 1)
}

</p>



<button

onClick={()=>
removeFromCart(index)
}

className="
mt-6
w-full
bg-red-500
hover:bg-red-600
transition-all
duration-300
py-4
rounded-2xl
font-bold
hover:scale-105
"

>

🗑 Remove Item

</button>

</div>

</div>

))}

</div>





{/* COUPON + SUMMARY */}

<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-8
mt-12
">




{/* COUPON */}

<div className={`

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
mb-6
">
🎁 Apply Coupon
</h2>

<div className="
flex
gap-4
flex-wrap
">

<input

placeholder="Enter coupon code"

value={coupon}

onChange={(e)=>
setCoupon(e.target.value)
}

className={`

flex-1
p-4
rounded-2xl
outline-none

${
darkMode
? "bg-black text-white"
: "bg-gray-100 text-black border border-gray-300"
}

`}
/>

<button

onClick={applyCoupon}

className="
bg-purple-500
hover:bg-purple-600
px-8
rounded-2xl
font-bold
transition
"

>

Apply

</button>

</div>


<div className="
mt-6
space-y-3
">

<p>
🔥 SAVE50 → Flat ₹50 OFF
</p>

<p>
⚡ FIRST20 → 20% OFF
</p>

</div>

</div>





{/* SUMMARY */}

<div className={`

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
💳 Order Summary
</h2>


<div className="
space-y-5
text-lg
">

<div className="
flex
justify-between
">

<p>Subtotal</p>

<p>
₹{total}
</p>

</div>


<div className="
flex
justify-between
text-red-400
">

<p>Discount</p>

<p>
-₹{Math.floor(discount)}
</p>

</div>


<div className="
border-t
pt-5
flex
justify-between
text-3xl
font-black
text-green-500
">

<p>Total</p>

<p>
₹{Math.floor(total-discount)}
</p>

</div>

</div>



<button

onClick={()=>
navigate("/checkout")
}

className="
mt-10
w-full
bg-gradient-to-r
from-green-500
to-emerald-600
py-5
rounded-2xl
font-black
text-xl
hover:scale-105
transition-all
duration-300
shadow-2xl
"

>

Checkout 🚀

</button>

</div>

</div>

</>

)}

</div>

);

}