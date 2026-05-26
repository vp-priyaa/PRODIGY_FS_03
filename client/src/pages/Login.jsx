import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){

const navigate=useNavigate();

const [form,setForm]=useState({
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

const res = await axios.post(
"https://prodigy-fs-03-whp0.onrender.com/api/auth/login",
form
);

localStorage.setItem(
"token",
res.data.token
);

alert("Login Successful");

navigate("/dashboard");

}catch(err){

alert(
err.response?.data?.message ||
"Login Failed"
)

}

};

return(

<div className="min-h-screen flex items-center justify-center bg-black text-white">

<form
onSubmit={handleSubmit}
className="bg-gray-900 p-8 rounded-2xl w-96"
>

<h1 className="text-3xl font-bold mb-6">
Login
</h1>

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
Login
</button>

</form>

</div>

)

}