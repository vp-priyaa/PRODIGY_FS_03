import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

import {

ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
PieChart,
Pie,
Cell,
LineChart,
Line,
CartesianGrid

} from "recharts";

export default function SellerAnalytics(){

const navigate=useNavigate();

const [darkMode,setDarkMode]=useState(false);

const [orders,setOrders]=useState([]);
const [products,setProducts]=useState([]);
const [topProducts,setTopProducts]=useState([]);




/* LOAD DATA */

useEffect(()=>{

const savedTheme=
JSON.parse(
localStorage.getItem("darkMode")
);

if(savedTheme!==null){

setDarkMode(savedTheme);

}


const orderData=
JSON.parse(
localStorage.getItem("orders")
) || [];


const sellerProducts=
JSON.parse(
localStorage.getItem("sellerProducts")
) || [];


/* INCLUDE ORDER ITEMS ALSO */

const allProducts=[

...sellerProducts,

...orderData.flatMap(
order=>order.items || []
)

];


setOrders(orderData);
setProducts(allProducts);



/* TOP PRODUCTS */

const productCount={};

orderData.forEach((order)=>{

order.items?.forEach((item)=>{

if(productCount[item.name]){

productCount[item.name]+=(
item.quantity || 1
);

}else{

productCount[item.name]=(
item.quantity || 1
);

}

});

});


const sortedProducts=

Object.entries(productCount)

.map(([name,count])=>({

name,
count

}))

.sort((a,b)=>b.count-a.count)

.slice(0,5);


setTopProducts(sortedProducts);

},[]);




/* TOTALS */

const totalProducts=
products.length;

const totalOrders=
orders.length;

const totalCustomers=
new Set(
orders.map(
order=>order.name
)
).size;




/* REVENUE */

const revenue=

orders.reduce((total,order)=>{

const amount=

order.items?.reduce(

(sum,item)=>

sum+
(
(item.price || 0)*
(item.quantity || 1)
),

0

) || 0;

return total+amount;

},0);





/* BAR CHART */

const chartData=[

{
name:"Products",
value:totalProducts
},

{
name:"Orders",
value:totalOrders
},

{
name:"Customers",
value:totalCustomers
},

{
name:"Revenue",
value:Math.floor(
revenue/1000
)
}

];





/* MONTHLY SALES */

const monthlySales={};

orders.forEach((order)=>{

const date=
new Date(order.time);

const month=

isNaN(date)

? "This Month"

: date.toLocaleString(
"default",
{
month:"short"
}
);

const amount=

order.items?.reduce(

(sum,item)=>

sum+
(
(item.price || 0)*
(item.quantity || 1)
),

0

) || 0;


monthlySales[month]=
(monthlySales[month] || 0)
+amount;

});


const salesData=

Object.keys(
monthlySales
).map(month=>({

month,

sales:
monthlySales[month]

}));






/* CATEGORY ANALYTICS */

/* CATEGORY ANALYTICS */

const categoryMap={};

/* TAKE CATEGORY FROM SELLER PRODUCTS */

products.forEach((product)=>{

const category=

product?.category
? product.category.trim()
: "Other";

categoryMap[category]=
(categoryMap[category] || 0)+1;

});


/* IF NO CATEGORY EXISTS */

if(
Object.keys(categoryMap).length===0
){

categoryMap["Other"]=1;

}


const pieData=

Object.entries(categoryMap)

.map(([name,value])=>({

name,
value

}));



/* COLORS */

const COLORS=[

"#22c55e",
"#3b82f6",
"#f97316",
"#a855f7",
"#ef4444",
"#14b8a6",
"#facc15"

];





/* WEEKLY SALES */

/* WEEKLY SALES */

const weeklyMap={

Mon:0,
Tue:0,
Wed:0,
Thu:0,
Fri:0,
Sat:0,
Sun:0

};


orders.forEach((order)=>{

if(!order?.items) return;

const date=
new Date(order.time);

if(isNaN(date)) return;

const day=
date.toLocaleString(
"default",
{
weekday:"short"
}
);

const total=

order.items.reduce(

(sum,item)=>

sum+

(
Number(item.price || 0)*
Number(item.quantity || 1)
),

0

);


if(
weeklyMap[day] !== undefined
){

weeklyMap[day]+=total;

}

});


const weeklyData=

Object.keys(weeklyMap)

.map((day)=>({

day,
sales:weeklyMap[day]

}));

/* TOP CUSTOMER */

const customerData={};

orders.forEach((order)=>{

customerData[order.name]=
(customerData[order.name] || 0)+1;

});


const topCustomer=

Object.entries(customerData)

.sort((a,b)=>b[1]-a[1])[0];






return(

<div className={`

min-h-screen
p-8

${
darkMode
?
"bg-black text-white"
:
"bg-gray-100 text-black"
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

📊 Seller Analytics

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

Track your business professionally 🚀

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






{/* TOP STATS */}

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">

<div className="
bg-gradient-to-br
from-blue-500
to-cyan-600
rounded-3xl
p-6
text-center
shadow-2xl
">

<h2 className="text-5xl">
🛒
</h2>

<p className="
mt-4
text-3xl
font-black
">
{totalProducts}
</p>

<p className="mt-2">
Total Products
</p>

</div>





<div className="
bg-gradient-to-br
from-green-500
to-emerald-600
rounded-3xl
p-6
text-center
shadow-2xl
">

<h2 className="text-5xl">
📦
</h2>

<p className="
mt-4
text-3xl
font-black
">
{totalOrders}
</p>

<p className="mt-2">
Total Orders
</p>

</div>





<div className="
bg-gradient-to-br
from-purple-500
to-pink-600
rounded-3xl
p-6
text-center
shadow-2xl
">

<h2 className="text-5xl">
👥
</h2>

<p className="
mt-4
text-3xl
font-black
">
{totalCustomers}
</p>

<p className="mt-2">
Customers
</p>

</div>





<div className="
bg-gradient-to-br
from-orange-500
to-red-500
rounded-3xl
p-6
text-center
shadow-2xl
">

<h2 className="text-5xl">
💰
</h2>

<p className="
mt-4
text-3xl
font-black
">
₹{revenue}
</p>

<p className="mt-2">
Revenue
</p>

</div>

</div>







{/* BAR CHART */}

<div className={`

mt-10
rounded-3xl
p-8
shadow-2xl

${
darkMode
?
"bg-[#111827]"
:
"bg-white border border-gray-200"
}

`}>

<h2 className="
text-3xl
font-black
mb-8
">

📈 Business Overview

</h2>

<div className="
w-full
h-[320px]
min-h-[320px]
">

<ResponsiveContainer
width="100%"
height={320}
>

<BarChart
data={chartData}
>

<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis
dataKey="name"
/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="value"
fill="#f58630"
radius={[10,10,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>







{/* MONTHLY SALES */}

<div className={`

mt-10
rounded-3xl
p-8
shadow-2xl

${
darkMode
?
"bg-[#111827]"
:
"bg-white border border-gray-200"
}

`}>

<h2 className="
text-3xl
font-black
mb-8
">

💰 Monthly Earnings

</h2>

<div className="
space-y-6
">

{salesData.map((data,index)=>(

<div key={index}>

<div className="
flex
justify-between
font-bold
mb-2
">

<span>
{data.month}
</span>

<span>
₹{data.sales}
</span>

</div>

<div className="
w-full
bg-gray-300
h-5
rounded-full
overflow-hidden
">

<div

style={{
width:`${
Math.min(
revenue > 0
? (data.sales/revenue)*100
: 0,
100
)
}%`
}}

className="
bg-green-500
h-full
rounded-full
transition-all
duration-700
"
/>

</div>

</div>

))}

</div>

</div>








{/* TOP PRODUCTS */}

<div className={`

mt-10
rounded-3xl
p-8
shadow-2xl

${
darkMode
?
"bg-[#111827]"
:
"bg-white border border-gray-200"
}

`}>

<h2 className="
text-3xl
font-black
mb-8
">

🥇 Top Selling Products

</h2>

<div className="
space-y-5
">

{topProducts.length===0 ? (

<p className="
text-lg
text-gray-500
">

No product sales data

</p>

):(


topProducts.map((product,index)=>(

<div
key={index}

className={`

rounded-2xl
p-5
flex
justify-between
items-center
transition-all
duration-300
hover:scale-[1.02]

${
darkMode
?
"bg-gray-800"
:
"bg-gray-100"
}

`}
>

<div>

<h3 className="
text-2xl
font-bold
">

{product.name}

</h3>

<p className="
text-gray-500
mt-1
">

Sold: {product.count}

</p>

</div>

<div className="
bg-green-500
px-6
py-3
rounded-full
text-white
font-bold
">

#{index+1}

</div>

</div>

))

)}

</div>

</div>








{/* PIE + LINE */}

<div className="
grid
grid-cols-1
xl:grid-cols-2
gap-8
mt-10
">




{/* PIE */}

<div className={`

rounded-3xl
p-8
shadow-2xl

${
darkMode
?
"bg-[#111827]"
:
"bg-white border border-gray-200"
}

`}>

<h2 className="
text-3xl
font-black
mb-5
">

🥧 Category Analytics

</h2>

<div className="
w-full
h-[320px]
min-h-[320px]
">

<ResponsiveContainer
width="99%"
height={320}
>

<PieChart width={400} height={320}>

<Pie
data={pieData}
dataKey="value"
nameKey="name"
cx="50%"
cy="50%"
outerRadius={110}
label
>

{pieData.map((entry,index)=>(

<Cell
key={index}
fill={
COLORS[
index%
COLORS.length
]
}
/>

))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>






{/* LINE */}

<div className={`

rounded-3xl
p-8
shadow-2xl

${
darkMode
?
"bg-[#111827]"
:
"bg-white border border-gray-200"
}

`}>

<h2 className="
text-3xl
font-black
mb-5
">

📈 Weekly Sales

</h2>

<div className="
w-full
h-[320px]
min-h-[320px]
">

<ResponsiveContainer
width={500}
height={320}
>

<LineChart
width={500}
height={320}
data={weeklyData}
>

<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis
dataKey="day"
/>

<YAxis/>

<Tooltip
contentStyle={{
borderRadius:"15px",
border:"none",
background:"#111827",
color:"white"
}}
/>

<Line
type="monotone"
dataKey="sales"
stroke="#22c55e"
strokeWidth={5}
dot={{r:6}}
activeDot={{r:10}}
animationDuration={1200}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

</div>








{/* TOP CUSTOMER */}

<div className={`

mt-10
rounded-3xl
p-8
shadow-2xl
text-center

${
darkMode
?
"bg-[#111827]"
:
"bg-white border border-gray-200"
}

`}>

<h2 className="
text-3xl
font-black
mb-5
">

👑 Top Customer

</h2>

{topCustomer ? (

<>

<p className="text-6xl">
🏆
</p>

<h3 className="
text-3xl
font-black
mt-4
">

{topCustomer[0]}

</h3>

<p className="
mt-3
text-lg
text-green-500
font-bold
">

Orders: {topCustomer[1]}

</p>

</>

):(


<p className="
text-lg
text-gray-500
">

No customer data found

</p>

)}

</div>







{/* FOOTER */}

<div className="
mt-16
text-center
">

<p className="
text-sm
text-gray-500
">

Zoopar Seller Analytics Dashboard 🚀

</p>

</div>

</div>

);

}