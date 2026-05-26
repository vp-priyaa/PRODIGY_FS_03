import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

export default function SellerProfile(){

const navigate=useNavigate();

const [profiles,setProfiles]=useState([]);

const [shopName,setShopName]=useState("");
const [owner,setOwner]=useState("");
const [phone,setPhone]=useState("");
const [address,setAddress]=useState("");
const [logo,setLogo]=useState("");

const [editIndex,setEditIndex]=useState(null);

const [darkMode,setDarkMode]=useState(false);


useEffect(()=>{

const data=
JSON.parse(
localStorage.getItem(
"sellerProfiles"
)
) || [];

setProfiles(data);


const theme=
JSON.parse(
localStorage.getItem(
"darkMode"
)
);

if(theme!==null){

setDarkMode(theme);

}

},[]);




// SAVE PROFILE

const saveProfile=()=>{

if(
!shopName ||
!owner
){

alert(
"Please fill required fields"
);

return;

}


const profile={

shopName,
owner,
phone,
address,
logo

};


let updated=[...profiles];


if(editIndex!==null){

updated[editIndex]=profile;

setEditIndex(null);

}else{

updated.push(profile);

}


setProfiles(updated);

localStorage.setItem(

"sellerProfiles",

JSON.stringify(updated)

);


setShopName("");
setOwner("");
setPhone("");
setAddress("");
setLogo("");

};


const deleteProfile=(index)=>{

const updated=
profiles.filter(
(_,i)=>i!==index
);

setProfiles(updated);

localStorage.setItem(

"sellerProfiles",

JSON.stringify(updated)

);

};



const editProfile=(index)=>{

const profile=
profiles[index];

setShopName(
profile.shopName
);

setOwner(
profile.owner
);

setPhone(
profile.phone
);

setAddress(
profile.address
);

setLogo(
profile.logo
);

setEditIndex(index);

window.scrollTo({

top:0,
behavior:"smooth"

});

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
gap-5
mb-10
">

<div>

<h1 className="
text-5xl
font-black
">
🏪 Seller Profile
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

Manage your seller information professionally

</p>

</div>


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
shadow-lg
"

>

⬅ Back

</button>

</div>



{/* FORM */}

<div className={`

rounded-3xl
p-8
mb-12
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

{editIndex!==null
? "✏ Update Seller Profile"
: "➕ Add Seller Profile"}

</h2>



<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">

<input
placeholder="Shop Name"
value={shopName}
onChange={(e)=>
setShopName(
e.target.value
)
}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 text-black border border-gray-300"
}

`}
/>


<input
placeholder="Owner Name"
value={owner}
onChange={(e)=>
setOwner(
e.target.value
)
}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 text-black border border-gray-300"
}

`}
/>


<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>
setPhone(
e.target.value
)
}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 text-black border border-gray-300"
}

`}
/>


<input
placeholder="Logo URL"
value={logo}
onChange={(e)=>
setLogo(
e.target.value
)
}

className={`

p-4
rounded-2xl
outline-none

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 text-black border border-gray-300"
}

`}
/>

</div>



<textarea
placeholder="Shop Address"
value={address}
onChange={(e)=>
setAddress(
e.target.value
)
}

className={`

w-full
mt-5
p-4
rounded-2xl
outline-none
h-32

${
darkMode
? "bg-gray-900 text-white"
: "bg-gray-100 text-black border border-gray-300"
}

`}
/>



<button

onClick={saveProfile}

className="
mt-6
w-full
bg-green-500
hover:bg-green-600
transition-all
py-4
rounded-2xl
font-bold
text-lg
shadow-xl
"

>

{editIndex!==null

? "Update Profile ✏️"

: "Save Profile ✅"}

</button>

</div>





{/* PROFILE CARDS */}

{profiles.length===0 ? (

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
No Seller Profiles Found 😢
</h2>

<p className={`
text-lg

${
darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>

Add your seller profile to continue

</p>

</div>

):(


<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-8
">

{profiles.map((profile,index)=>(

<div
key={index}

className={`

rounded-3xl
overflow-hidden
shadow-2xl
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

<img

src={
profile.logo?.trim()

? profile.logo

: "https://images.unsplash.com/photo-1563013544-824ae1b704d"
}

alt={profile.shopName}

onError={(e)=>{

e.target.src=
"https://images.unsplash.com/photo-1563013544-824ae1b704d";

}}

className="
w-full
h-60
object-cover
"
/>



<div className="p-6">

<h2 className="
text-3xl
font-black
mb-3
">
{profile.shopName}
</h2>


<div className="
space-y-2
">

<p className="
text-lg
">
👤 {profile.owner}
</p>

<p className="
text-lg
">
📞 {profile.phone}
</p>

<p className={`
leading-relaxed

${
darkMode
? "text-gray-400"
: "text-gray-600"
}

`}>
📍 {profile.address}
</p>

</div>



<div className="
flex
gap-4
mt-8
">

<button

onClick={()=>
editProfile(index)
}

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
deleteProfile(index)
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

Zoopar Seller Profile Management 🚀

</p>

</div>

</div>

);

}