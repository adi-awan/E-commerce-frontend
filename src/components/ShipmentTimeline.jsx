const ShipmentTimeline = ({
  status
}) => {


const steps = [

"Pending",

"Packed",

"Shipped",

"In Transit",

"Out For Delivery",

"Delivered"

];


return (

<div className="mt-6">

{
steps.map((step,index)=>{


const active =
steps.indexOf(status)
>= index;


return (

<div
key={step}
className="flex items-center gap-3 mb-4"
>


<div
className={`w-4 h-4 rounded-full ${
active
? "bg-green-600"
: "bg-gray-300"
}`}
/>


<p
className={
active
?
"font-bold"
:
"text-gray-400"
}
>

{step}

</p>


</div>

)

})

}

</div>

)

}


export default ShipmentTimeline;