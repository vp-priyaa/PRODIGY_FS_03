import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SellerProducts(){

const navigate=useNavigate();

const [products,setProducts]=useState([]);
const [darkMode,setDarkMode]=useState(false);

useEffect(()=>{

const shop=
JSON.parse(
localStorage.getItem("sellerShop")
);

const allProducts=
JSON.parse(
localStorage.getItem("sellerProducts")
) || [];

if(shop){

const filtered=
allProducts.filter(
p=>p.shopName===shop.name
);

setProducts(filtered);

}

const theme=
JSON.parse(
localStorage.getItem("darkMode")
);

if(theme!==null){
setDarkMode(theme);
}

},[]);



const deleteProduct=(id)=>{

const updated=
products.filter(
p=>p.id!==id
);

setProducts(updated);

localStorage.setItem(
"sellerProducts",
JSON.stringify(updated)
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

{/* HEADER */}

<div className="
flex
justify-between
items-center
flex-wrap
gap-4
mb-10
">

<div>

<h1 className="
text-5xl
font-black
">
🛒 Seller Products
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

Manage your shop products easily

</p>

</div>


<div className="
flex
gap-4
flex-wrap
">

<button

onClick={()=>
navigate("/seller/add-product")
}

className="
bg-green-500
hover:bg-green-600
transition-all
px-6
py-3
rounded-2xl
font-bold
shadow-xl
"

>

➕ Add Product

</button>


<button

onClick={()=>
navigate("/sellerpanel")
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

</div>



{/* EMPTY STATE */}

{products.length===0 ? (

<div className={`

rounded-3xl
p-16
text-center
shadow-xl

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}>

<h2 className="
text-3xl
font-bold
mb-4
">
No Products Found 😢
</h2>

<p className={`
text-lg

${
darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>

Add products to start selling

</p>

</div>

):(


<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-8
">

{products.map((product,index)=>(

<div
key={index}

className={`

rounded-3xl
overflow-hidden
shadow-2xl
transition-all
duration-300
hover:scale-[1.03]

${
darkMode
? "bg-[#111827]"
: "bg-white border border-gray-200"
}

`}
>

{/* IMAGE */}

<div className="
relative
">

<img
src={product.image}
alt={product.name}

className="
w-full
h-60
object-cover
"
/>

<div className="
absolute
top-4
right-4
bg-green-500
text-white
px-4
py-1
rounded-full
font-bold
shadow-lg
">

₹ {product.price}

</div>

</div>



{/* CONTENT */}

<div className="p-6">

<h2 className="
text-2xl
font-black
mb-2
">
{product.name}
</h2>

<p className={`
text-sm
leading-relaxed

${
darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>

{product.description ||
"High quality product available in your store"}

</p>



<div className="
flex
justify-between
items-center
mt-6
gap-3
">

<button

className="
flex-1
bg-blue-500
hover:bg-blue-600
transition-all
py-3
rounded-2xl
font-bold
shadow-lg
"

>

✏ Edit

</button>


<button

onClick={()=>
deleteProduct(product.id)
}

className="
flex-1
bg-red-500
hover:bg-red-600
transition-all
py-3
rounded-2xl
font-bold
shadow-lg
"

>

🗑 Delete

</button>

</div>

</div>

</div>

))}

</div>

)}



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

Zoopar Seller Products Management 🚀

</p>

</div>

</div>

);

}