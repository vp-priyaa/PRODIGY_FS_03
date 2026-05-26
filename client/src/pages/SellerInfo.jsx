import {useEffect,useState} from "react";

export default function SellerInfo(){

const [shop,setShop]=useState({

name:"",
city:"",
category:"",
phone:"",
description:""

});

const [saved,setSaved]=useState(false);

useEffect(()=>{

const data=
JSON.parse(
localStorage.getItem(
"sellerShop"
)
);

if(data){

setShop({

name:data.name || "",
city:data.city || "",
category:data.category || "",
phone:data.phone || "",
description:data.description || ""

});

}

},[]);


const updateInfo=()=>{

localStorage.setItem(

"sellerShop",

JSON.stringify(shop)

);

setSaved(true);

setTimeout(()=>{

setSaved(false);

},2000);

};


return(

<div className="
min-h-screen
bg-black
text-white
p-10
">

<h1 className="
text-5xl
font-bold
mb-10
">
🏪 Seller Information
</h1>


<div className="
bg-gray-900
rounded-3xl
p-10
max-w-3xl
shadow-xl
space-y-5
">

<input
value={shop.name}
onChange={(e)=>
setShop({
...shop,
name:e.target.value
})
}
placeholder="Shop Name"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<input
value={shop.city}
onChange={(e)=>
setShop({
...shop,
city:e.target.value
})
}
placeholder="City"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<input
value={shop.category}
onChange={(e)=>
setShop({
...shop,
category:e.target.value
})
}
placeholder="Category"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<input
value={shop.phone}
onChange={(e)=>
setShop({
...shop,
phone:e.target.value
})
}
placeholder="Phone"
className="
w-full
p-4
rounded-xl
text-black
"
/>


<textarea
value={shop.description}
onChange={(e)=>
setShop({
...shop,
description:e.target.value
})
}
placeholder="Description"
className="
w-full
p-4
rounded-xl
text-black
h-32
"
/>


<button
onClick={updateInfo}
className="
bg-green-500
w-full
py-4
rounded-xl
font-bold
"
>

💾 Save Changes

</button>


{saved && (

<div className="
bg-green-600
rounded-xl
text-center
py-3
font-bold
">

✅ Updated Successfully

</div>

)}

</div>

</div>

);

}
