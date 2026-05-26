import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Chat(){

const navigate=useNavigate();

const [messages,setMessages]=useState([]);
const [input,setInput]=useState("");
const [darkMode,setDarkMode]=useState(false);



// ======================
// LOAD DATA
// ======================

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




// ======================
// LOAD CHAT
// ======================

const loadMessages=()=>{

const data=
JSON.parse(
localStorage.getItem(
"chatMessages"
)
)||[];

setMessages(data);

};




// ======================
// SEND MESSAGE
// ======================

const sendMessage=()=>{

if(!input.trim()){

return;

}

const data=
JSON.parse(
localStorage.getItem(
"chatMessages"
)
)||[];


data.push({

sender:"Customer",

text:input,

time:new Date()
.toLocaleTimeString()

});


localStorage.setItem(

"chatMessages",

JSON.stringify(data)

);


setInput("");

loadMessages();

};




// ======================
// DELETE MESSAGE
// ======================

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




// ======================
// RETURN
// ======================

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
💬 Customer Chat
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

Chat instantly with the seller 🚀

</p>

</div>



<button

onClick={()=>
navigate(-1)
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





{/* CHAT BOX */}

<div className={`

h-[550px]
rounded-3xl
p-6
overflow-y-auto
shadow-2xl

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

<div className="text-center">

<h2 className="
text-3xl
font-bold
mb-4
">
No Messages Yet 😢
</h2>

<p className={`

${
darkMode
? "text-gray-400"
: "text-gray-500"
}

`}>

Start chatting with the seller

</p>

</div>

</div>

):(


messages.map((msg,index)=>(

<div

key={index}

className={`

relative
mb-5
p-5
rounded-3xl
max-w-[75%]
shadow-xl
transition-all
duration-300

${
msg.sender==="Customer"

?

"bg-green-500 ml-auto text-white"

:

"bg-blue-500 text-white"
}

`}

>

<div className="
flex
justify-between
items-center
gap-4
">

<h2 className="
font-bold
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
px-2
rounded-lg
text-sm
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
opacity-70
mt-4
text-right
">

🕒 {msg.time}

</p>

</div>

))

)}

</div>





{/* INPUT */}

<div className="
flex
gap-4
mt-6
flex-wrap
">

<input

value={input}

onChange={(e)=>
setInput(
e.target.value
)
}

onKeyDown={(e)=>{

if(e.key==="Enter"){

sendMessage();

}

}}

placeholder="Type your message..."

className={`

flex-1
p-5
rounded-2xl
outline-none
text-lg

${
darkMode
? "bg-[#111827] text-white"
: "bg-white text-black border border-gray-300"
}

`}
/>



<button

onClick={sendMessage}

className="
bg-green-500
hover:bg-green-600
transition-all
px-10
rounded-2xl
font-bold
text-lg
shadow-xl
text-white
"

>

Send 🚀

</button>

</div>





{/* FOOTER */}

<div className="
mt-10
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

Zoopar Customer Support Chat 💬

</p>

</div>

</div>

);

}