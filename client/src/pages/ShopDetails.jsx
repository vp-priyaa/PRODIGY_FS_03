import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export default function ShopDetails() {

const { id } = useParams();

const navigate=useNavigate();

const [shop,setShop]=useState(null);
const [products,setProducts]=useState([]);

const [rating,setRating]=useState(5);
const [comment,setComment]=useState("");
const [user,setUser]=useState("");

const [cartMessage,setCartMessage]=useState("");

const [darkMode]=useState(

JSON.parse(
localStorage.getItem("darkMode")
) || false

);



// =====================
// FETCH DATA
// =====================

useEffect(()=>{

fetchData();

},[]);



const fetchData=async()=>{

try{

const shopRes=
await axios.get(
`http://localhost:5000/api/shops/${id}`
);

setShop(
shopRes.data
);


const productRes=
await axios.get(
`http://localhost:5000/api/products/shop/${id}`
);

setProducts(
productRes.data
);

}catch(err){

console.log(err);

}

};




// =====================
// SUBMIT REVIEW
// =====================

const submitReview=async()=>{

try{

await axios.post(
`http://localhost:5000/api/shops/${id}/review`,
{
user,
rating,
comment
}
);

fetchData();

setUser("");
setComment("");

}catch(err){

console.log(err);

}

};




// =====================
// ADD TO CART
// =====================

const addToCart=(p)=>{

const cart=
JSON.parse(
localStorage.getItem("cart")
) || [];


const existingItem=
cart.find(
item=>item._id===p._id
);


if(existingItem){

existingItem.quantity=
(existingItem.quantity || 1)+1;

}else{

cart.push({

...p,
quantity:1

});

}


localStorage.setItem(
"cart",
JSON.stringify(cart)
);


window.dispatchEvent(
new Event("cartUpdated")
);


setCartMessage(
`${p.name} added to cart ✅`
);


setTimeout(()=>{

setCartMessage("");

},2000);

};




// =====================
// LOADING
// =====================

if(!shop){

return(

<div className={`
min-h-screen
flex
items-center
justify-center

${
darkMode
? "bg-black text-white"
: "bg-white text-black"
}

`}>

Loading...

</div>

);

}




// =====================
// RECOMMENDED
// =====================

const recommendedProducts=
products
.filter(
(p)=>p._id!==products[0]?._id
)
.slice(0,4);




// =====================
// RETURN
// =====================

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



{/* CART MESSAGE */}

{cartMessage && (

<div
className="
fixed
top-5
right-5
bg-green-500
text-white
px-6
py-3
rounded-xl
shadow-xl
z-50
font-bold
animate-pulse
"
>

{cartMessage}

</div>

)}




{/* HEADER */}

<div className="
flex
justify-between
items-center
flex-wrap
gap-5
mb-10
">

<div>

<h1 className="
text-5xl
font-black
">
{shop.name}
</h1>

<p className="
mt-3
text-lg
text-gray-400
">
📍 {shop.city}
</p>

<p className="
mt-2
text-lg
text-green-500
font-bold
">
🏷 {shop.category}
</p>

</div>



<div className="
flex
gap-4
flex-wrap
">

<button

onClick={()=>
navigate("/chat")
}

className="
bg-blue-500
hover:bg-blue-600
transition-all
px-6
py-3
rounded-2xl
font-bold
text-white
shadow-lg
"

>

💬 Chat Seller

</button>



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
text-white
shadow-lg
"

>

⬅ Back

</button>

</div>

</div>





{/* SHOP IMAGE */}

<div className="
rounded-3xl
overflow-hidden
shadow-2xl
mb-12
">

<img

src={
shop.image &&
shop.image.startsWith("http") &&
!shop.image.includes("dummyimage") &&
!shop.image.includes("Shop+Image")

? shop.image

: "https://images.unsplash.com/photo-1758520387283-303b0b332e89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg4fHxzaG9wcGluZyUyMG1hbGx8ZW58MHx8MHx8fDA%3D"
}

alt={shop.name}

onError={(e)=>{

e.target.onerror=null;

e.target.src=
"https://images.unsplash.com/photo-1580793241553-e9f1cce181af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmclMjBtYWxsfGVufDB8fDB8fHww";

}}

className="
w-full
h-[350px]
object-cover
rounded-[30px]
shadow-xl
transition-all
duration-500
hover:scale-[1.02]
"
/>

</div>

{/* PRODUCTS */}

<h2 className="
text-4xl
font-black
mb-8
">
🛒 Products
</h2>


<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-8
">

{products.map((p)=>(

<div
key={p._id}

className={`

rounded-3xl
overflow-hidden
shadow-2xl
transition-all
duration-300
hover:scale-[1.03]

${
darkMode
? "bg-[#0f172a]"
: "bg-white border border-gray-200"
}

`}
>

<img

src={p.image}

alt={p.name}

onError={(e)=>{

e.target.src=
"https://dummyimage.com/600x600/cccccc/000000&text=No+Image";

}}

className="
w-full
h-60
object-cover
"
/>



<div className="p-6">

<h3 className="
text-2xl
font-black
">
{p.name}
</h3>

<p className="
mt-3
text-3xl
font-bold
text-green-500
">
₹{p.price}
</p>



<button

onClick={()=>
addToCart(p)
}

className="
mt-6
bg-green-500
hover:bg-green-600
transition-all
w-full
py-4
rounded-2xl
font-bold
text-white
shadow-lg
"

>

🛒 Add to Cart

</button>

</div>

</div>

))}

</div>






{/* RECOMMENDATIONS */}

<div className="mt-24">

<h2 className="
text-4xl
font-black
mb-8
">
🤖 You may also like
</h2>


<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">

{recommendedProducts.map((p)=>(

<div
key={p._id}

className={`

rounded-3xl
overflow-hidden
shadow-2xl
transition-all
duration-300
hover:scale-[1.03]

${
darkMode
? "bg-[#0f172a]"
: "bg-white border border-gray-200"
}

`}
>

<img

src={p.image}

alt={p.name}

onError={(e)=>{

e.target.src=
"https://dummyimage.com/600x600/cccccc/000000&text=No+Image";

}}

className="
w-full
h-44
object-cover
"
/>



<div className="p-5">

<h3 className="
text-xl
font-black
">
{p.name}
</h3>

<p className="
mt-2
text-green-500
font-bold
text-xl
">
₹{p.price}
</p>



<button

onClick={()=>
addToCart(p)
}

className="
mt-5
bg-green-500
hover:bg-green-600
transition-all
w-full
py-3
rounded-2xl
font-bold
text-white
"

>

🛒 Add

</button>

</div>

</div>

))}

</div>

</div>






{/* REVIEWS */}

<div className="mt-24">

<h2 className="
text-4xl
font-black
mb-8
">
⭐ Reviews
</h2>




{/* REVIEW FORM */}

<div className={`

max-w-2xl
rounded-3xl
p-8
shadow-2xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

<input

placeholder="Your name"

value={user}

onChange={(e)=>
setUser(e.target.value)
}

className="
w-full
p-4
rounded-2xl
text-black
mb-5
outline-none
"
/>



<select

value={rating}

onChange={(e)=>
setRating(e.target.value)
}

className="
w-full
p-4
rounded-2xl
text-black
mb-5
outline-none
"

>

<option value="5">
5 ⭐
</option>

<option value="4">
4 ⭐
</option>

<option value="3">
3 ⭐
</option>

<option value="2">
2 ⭐
</option>

<option value="1">
1 ⭐
</option>

</select>




<textarea

placeholder="Write review..."

value={comment}

onChange={(e)=>
setComment(e.target.value)
}

className="
w-full
h-32
p-4
rounded-2xl
text-black
mb-5
outline-none
"
/>



<button

onClick={submitReview}

className="
bg-green-500
hover:bg-green-600
transition-all
px-8
py-4
rounded-2xl
font-bold
text-white
shadow-lg
"

>

Submit Review

</button>

</div>





{/* REVIEW LIST */}

<div className="mt-10 space-y-6">

{shop.reviews?.length===0 ? (

<div className={`

rounded-3xl
p-10
text-center

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

No reviews yet 😢

</div>

):(


shop.reviews?.map((r,index)=>(

<div
key={index}

className={`

rounded-3xl
p-6
shadow-xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}
>

<div className="
flex
justify-between
items-center
flex-wrap
gap-3
">

<h3 className="
text-2xl
font-black
">
{r.user}
</h3>

<p className="
text-yellow-500
font-bold
text-lg
">
⭐ {r.rating}/5
</p>

</div>


<p className={`

mt-4
text-lg
leading-relaxed

${
darkMode
? "text-gray-300"
: "text-gray-700"
}

`}>

{r.comment}

</p>

</div>

))

)}

</div>

</div>

</div>

);

}