import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState , } from "react";
import { getDogs, sort , sortBySize,getTemperments,sortByTemp , sortByCreatedOrAll } from "../store/action";
import Dog from "./dogCard";
import SearchBar from "./searchBar";
import { NavLink } from "react-router-dom";
import Pagination from "./pagination";

export  default  function Home() {
    const [ order,setOrder ] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [numDogs,setNumDogs] = useState(8)
  
  //get alldogs
  let dogs =  useSelector((state) => state.dogs)
  let dispatch = useDispatch()
  
    useEffect(() => {
    dispatch(getDogs())
  }, [])
let dogsLength = dogs.length
console.log(dogs)
//get tempermanents 
let temperaments = useSelector((state) => state.temperament)
useEffect(()=>{
  dispatch(getTemperments())
},[])
// pagination
let page = currentPage * numDogs // 1 * 8 = 8 // 2*8 = 16
let initalIdex = page - numDogs// 8 - 8 = 0 // 16 - 8 = 8
let showDogs = dogs.slice(initalIdex,page)
console.log(showDogs)

function handlePaged(page){
  setCurrentPage(page)

}

//alphabetical order 
  function handleOrder(e){
    e.preventDefault()

    dispatch(sort(e.target.value))
    setOrder(e.target.value)
}
//order by size
function handleOrderBySize(e){
  e.preventDefault()
  dispatch(sortBySize(e.target.value))
  setOrder(e.target.value)
}

//select temperament
function handleTempFilter(e){
  e.preventDefault()
  dispatch(sortByTemp(e.target.value))
  setOrder(e.target.value)
} 

function handleAllOrCreated(e){
  e.preventDefault()
  dispatch(sortByCreatedOrAll(e.target.value))
  setOrder(e.target.value)
}


  return (
    <div>

<Pagination currentPage={currentPage} numDogs={numDogs} dogsLength={dogsLength} handlePaged={handlePaged}  />

     <SearchBar/>
    

   <select onChange={handleOrder}  >
    <option value={order}>Order</option>
    <option value="fromAtoZ">A-Z</option>
    <option value="fromZtoA">Z-A</option>
  </select> 

<select onChange={handleAllOrCreated}>
  <option value={order}>Select dogs</option>
  <option value="all">All</option>
  <option value="created">Created</option>
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
    <NavLink to="/home/createDog">
    <button>Create your Dog!</button>
    </NavLink>  
       { showDogs.length ?  showDogs.map((dog) => {
        return (
          <NavLink to={`/home/${dog.id}`}>
          <Dog
            key={dog.id}
            image={dog.image}
            name={dog.name}
            temperament={dog.temperament}
            weight={dog.weight}
          />
         </NavLink>
        );
      }): "aca tengo q hacer componente loading" } 

   

    </div>
  );
}
