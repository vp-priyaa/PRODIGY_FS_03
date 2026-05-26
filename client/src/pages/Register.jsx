import { useState } from "react";
import axios from "axios";

export default function Register(){

const [form,setForm]=useState({
name:"",
email:"",
password:""
});

const handleChange=(e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSubmit=async(e)=>{
e.preventDefault();

try{

const res=await axios.post(
"http://localhost:5000/api/auth/register",
form
);

alert(res.data.message);

}catch(err){

alert(
err.response?.data?.message ||
"Registration Failed"
);

}
};

return(

<div className="min-h-screen flex items-center justify-center bg-black text-white">

<form
onSubmit={handleSubmit}
className="bg-gray-900 p-8 rounded-2xl w-96"
>

<h1 className="text-3xl font-bold mb-6">
Register
</h1>

<input
type="text"
name="name"
placeholder="Name"
onChange={handleChange}
className="w-full p-3 mb-4 rounded text-black"
/>

<input
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
className="w-full p-3 mb-4 rounded text-black"
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
className="w-full p-3 mb-4 rounded text-black"
/>

<button
className="w-full bg-green-500 p-3 rounded"
>
Register
</button>

</form>

</div>

)

}