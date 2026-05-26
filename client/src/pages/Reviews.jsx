import {useEffect,useState} from "react";

export default function Reviews(){

const [reviews,setReviews]=useState([]);

const [name,setName]=useState("");
const [rating,setRating]=useState(5);
const [comment,setComment]=useState("");

const [darkMode,setDarkMode]=useState(false);


// Load Theme
useEffect(()=>{

const savedTheme=
JSON.parse(
localStorage.getItem(
"darkMode"
)
);

if(savedTheme!==null){

setDarkMode(
savedTheme
);

}

},[]);


// Load Reviews
useEffect(()=>{

const data=
JSON.parse(
localStorage.getItem(
"reviews"
)
)||[];

setReviews(data);

},[]);




const addReview=()=>{

if(
!name||
!comment
){

alert(
"Fill all fields"
);

return;

}


const review={

name,
rating:Number(rating),
comment,

time:
new Date()
.toLocaleString()

};


const updated=[

...reviews,
review

];


setReviews(updated);


localStorage.setItem(

"reviews",
JSON.stringify(
updated
)

);


setName("");
setComment("");
setRating(5);

};



return(

<div className={`
min-h-screen
p-10
transition-all

${
darkMode
? "bg-black text-white"
: "bg-gray-100 text-black"
}
`}>

<h1 className="
text-5xl
font-bold
mb-10
text-center
text-yellow-500
">
⭐ Customer Reviews
</h1>



<div className={`
rounded-3xl
p-8
mb-10
shadow-xl

${
darkMode
?"bg-gray-900"
:"bg-white"
}
`}>

<input
placeholder="Your Name"
value={name}
onChange={(e)=>
setName(
e.target.value
)
}
className="
w-full
p-4
rounded-xl
text-black
mb-4
"
/>



<select
value={rating}
onChange={(e)=>
setRating(
e.target.value
)
}
className="
w-full
p-4
rounded-xl
text-black
mb-4
"
>

<option value={5}>
⭐⭐⭐⭐⭐
</option>

<option value={4}>
⭐⭐⭐⭐
</option>

<option value={3}>
⭐⭐⭐
</option>

<option value={2}>
⭐⭐
</option>

<option value={1}>
⭐
</option>

</select>



<textarea
placeholder="Write review..."
value={comment}
onChange={(e)=>
setComment(
e.target.value
)
}
className="
w-full
p-4
rounded-xl
text-black
mb-6
h-32
"
/>


<button
onClick={addReview}
className="
bg-green-500
w-full
py-4
rounded-xl
font-bold
hover:scale-105
transition
"
>

Submit Review

</button>

</div>




<div className="
flex
flex-wrap
gap-8
justify-center
">

{reviews.map((review,index)=>(

<div
key={index}
className={`

rounded-3xl
p-6
shadow-xl
transition-all
mb-5

${
darkMode
? "bg-gray-900 text-white"
: "bg-white text-black border border-gray-200"
}

`}
>

<h2 className="
text-2xl
font-bold
">
{review.name}
</h2>

<p className="
text-yellow-500
mt-2
">
{"⭐".repeat(review.rating)}
</p>

<p className={`
mt-4
${
darkMode
? "text-gray-300"
: "text-gray-700"
}
`}>
{review.comment}
</p>

<p className={`
mt-4
text-sm
${
darkMode
? "text-gray-500"
: "text-gray-500"
}
`}>
🕒 {review.time}
</p>

</div>

))}

</div>

</div>

)

}