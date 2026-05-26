import {useEffect,useState,useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function SellerChat(){

const navigate=useNavigate();

const [messages,setMessages]=useState([]);
const [reply,setReply]=useState("");
const [darkMode,setDarkMode]=useState(false);

const chatEndRef=useRef(null);


useEffect(()=>{

loadMessages();

const interval=setInterval(
loadMessages,
500
);

const theme=
JSON.parse(
localStorage.getItem(
"darkMode"
)
);

if(theme!==null){

setDarkMode(theme);

}

return()=>{

clearInterval(interval);

};

},[]);




useEffect(()=>{

chatEndRef.current?.scrollIntoView({
behavior:"smooth"
});

},[messages]);




// LOAD MESSAGES

const loadMessages=()=>{

const data=
JSON.parse(
localStorage.getItem(
"chatMessages"
)
) || [];

setMessages(data);

};




// SEND MESSAGE

const sendReply=()=>{

if(!reply.trim()){

return;

}

const data=
JSON.parse(
localStorage.getItem(
"chatMessages"
)
) || [];


data.push({

sender:"Seller",

text:reply,

time:new Date()
.toLocaleTimeString()

});


localStorage.setItem(

"chatMessages",

JSON.stringify(data)

);


setReply("");

loadMessages();

};




// DELETE MESSAGE

const deleteMessage=(index)=>{

const updated=
messages.filter(
(_,i)=>i!==index
);

localStorage.setItem(

"chatMessages",

JSON.stringify(updated)

);

setMessages(updated);

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
mb-8
">

<div>

<h1 className="
text-5xl
font-black
">
🏪 Seller Chat
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

Connect and reply to your customers instantly

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
shadow-xl
"

>

⬅ Back

</button>

</div>





{/* CHAT BOX */}

<div className={`

h-[520px]
rounded-3xl
p-6
overflow-y-auto
shadow-2xl
space-y-5

${
darkMode
? "bg-[#081327]"
: "bg-white border border-gray-200"
}

`}>

{messages.length===0 ? (

<div className="
h-full
flex
items-center
justify-center
">

<p className={`
text-xl

${
darkMode
? "text-gray-400"
: "text-gray-500"
}

`}>

No messages yet 💬

</p>

</div>

):(


messages.map((msg,index)=>(

<div
key={index}

className={`

relative
max-w-[80%]
p-5
rounded-3xl
shadow-xl
transition-all
duration-300

${
msg.sender==="Seller"

? "bg-blue-500 ml-auto text-white"

: "bg-green-500 text-white"
}

`}
>

<div className="
flex
justify-between
items-center
gap-5
">

<h2 className="
font-black
text-lg
">

{msg.sender}

</h2>


<button

onClick={()=>
deleteMessage(index)
}

className="
bg-red-500
hover:bg-red-600
transition-all
w-8
h-8
rounded-full
font-bold
"

>

✕

</button>

</div>



<p className="
mt-3
text-lg
leading-relaxed
break-words
">

{msg.text}

</p>


<p className="
text-xs
opacity-80
mt-4
text-right
">

🕒 {msg.time}

</p>

</div>

))

)}

<div ref={chatEndRef}></div>

</div>





{/* INPUT AREA */}

<div className="
flex
gap-4
mt-6
flex-wrap
">

<input

value={reply}

onChange={(e)=>
setReply(
e.target.value
)
}

onKeyDown={(e)=>{

if(e.key==="Enter"){

sendReply();

}

}}

placeholder="Type your reply..."

className={`

flex-1
p-5
rounded-2xl
outline-none
text-lg
shadow-xl

${
darkMode
? "bg-[#111827] text-white"
: "bg-white text-black border border-gray-300"
}

`}
/>


<button

onClick={sendReply}

className="
bg-blue-500
hover:bg-blue-600
transition-all
px-10
rounded-2xl
font-bold
shadow-xl
text-lg
"

>

Send 🚀

</button>

</div>





{/* FOOTER */}

<div className="
mt-12
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

Zoopar Seller Chat System 💬

</p>

</div>

</div>

);

}