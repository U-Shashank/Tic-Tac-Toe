

export default function Box(props) {
    console.log(props)
    return (
        <div className={`flex justify-center items-center w-6/7 aspect-square transition duration-500 ease-in cursor-pointer text-white bg-red-400 ${(!props.lineBox && props.win) ? "bg-zinc-950 text-zinc-950" : ""} ${(props.win) ? "cursor-default" : ""}`} onClick={props.handleClick}>
           <h1 className="lg:text-8xl md:text-7xl text-5xl">{props.value}</h1> 
        </div>
    ) 
}