import { useSelector, useDispatch , } from "react-redux";
import { useEffect, useState } from "react";
import { getDogs, sort , sortBySize,getTemperments,sortByTemp } from "../store/action";
import Dog from "./dogCard";
import SearchBar from "./searchBar";
//componente logico
export  default   function Home() {
    const [ order,setOrder ] = useState("")

  //get alldogs
  let dogs =  useSelector((state) => state.dogs)
  let dispatch = useDispatch()
  
    useEffect(() => {
    dispatch(getDogs())
  }, [])
//get tempermanents 
let temperaments = useSelector((state) => state.temperament)
useEffect(()=>{
  dispatch(getTemperments())
},[])


//alphabetical order 
  function handleOrder(e){
    e.preventDefault()
    console.log(e.target.value)
    dispatch(sort(e.target.value))
    setOrder(e.target.value)
}
//order by size
function handleOrderBySize(e){
  e.preventDefault()
  console.log(e.target.value)
  dispatch(sortBySize(e.target.value))
  setOrder(e.target.value)
}

//select temperament
function handleTempFilter(e){
  e.preventDefault()
  dispatch(sortByTemp(e.target.value))
  console.log(e.target.value)
  setOrder(e.target.value)
} 
 

  return (
    <div>
     <SearchBar/>
   <select onChange={handleOrder}  >
    <option value={order}>Order</option>
    <option value="fromAtoZ">A-Z</option>
    <option value="fromZtoA">Z-A</option>
  </select> 

  <select onChange={handleTempFilter}>
    <option value={order}>Temperament</option>
    {temperaments.map(temp => <option key={temp.id} value={temp.name}>{temp.name}</option>)}
    
  </select>   



  <select onChange={handleOrderBySize}>
    <option value={order} onChange={handleOrderBySize}>Size</option>
    <option value="big">Big Breeds</option>
    <option value="small">Small Breeds</option>
  
  </select> 
       { dogs.length ? dogs.map((dog) => {
        return (

          <Dog
            key={dog.id}
            image={dog.image}
            name={dog.name}
            temperament={dog.temperament}
            weight={dog.weight}
          />
         
        );
      }): "aca tengo q hacer componente loading" } 
    </div>
  );
}
