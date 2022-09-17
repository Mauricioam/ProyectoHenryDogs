import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState , } from "react";
import { getDogs, sort , sortBySize,getTemperments,sortByTemp , sortByCreatedOrAll } from "../../store/action";
import Dog from "./dogCard";
import SearchBar from "./searchBar";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination/pagination";
import style from "../styles/HomeStyle/home.css"
import Loading from "../Loading/loading";
import styles from "../styles/Loading/loading.css"

export  default  function Home() {
    const [ order,setOrder ] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [numDogs,setNumDogs] = useState(8)
  
    //get alldogs
  let dispatch = useDispatch()
  let dogs =  useSelector((state) => state.dogsFiltered)

    useEffect(() => {
    dispatch(getDogs())
  }, [])
    

 
//get tempermanents 
let temperaments = useSelector((state) => state.temperament)
  useEffect(()=>{
    dispatch(getTemperments());
},[])
  

// pagination
let dogsLength = dogs.length
let page = currentPage * numDogs 
let initalIdex = page - numDogs 
let showDogs = dogs?.slice(initalIdex,page) 

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

  setCurrentPage(1)
  setOrder(e.target.value)
}

//select temperament 
 function handleTempFilter(e){
  e.preventDefault()
    dispatch(sortByTemp(e.target.value))
  setCurrentPage(1)
} 
 
function handleAllOrCreated(e){ 
  e.preventDefault()

    dispatch(sortByCreatedOrAll(e.target.value))
  
   setOrder(e.target.value)
}




  return (
    <div className="main_conteiner">
      <div className="nav-bar_container">
    <header className="header"><span className="main_title">Henry Dog App</span></header>
    <nav className="nav_container"> 
    <SearchBar setCurrentPage={setCurrentPage}/>
  
    

   <select onChange={handleOrder}  className="nav_select" >
    <option disabled selected>Order</option>
    <option value="fromAtoZ">A-Z</option>
    <option value="fromZtoA">Z-A</option>
  </select> 

<select onChange={handleAllOrCreated}  className="nav_select" >
  <option disabled selected>Select dogs</option>
  <option value="all">All</option>
  <option value="created">Created</option>
</select>



  <select onChange={handleTempFilter}  className="nav_select" >
    <option disabled selected>Temperament</option>
    {temperaments.map(temp => <option key={temp.id} value={temp.name}>{temp.name}</option>)}
    
  </select>   



  <select onChange={handleOrderBySize}  className="nav_select" >
    <option disabled selected>Size</option>
    <option value="big">Big Breeds</option>
    <option value="small">Small Breeds</option>
  </select> 
    <NavLink to="/home/createDog">
    <button className="all_button">Create your Dog!</button>
    </NavLink> 
    </nav> 

 <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} numDogs={numDogs} dogsLength={dogsLength} handlePaged={handlePaged}  />
 <p className="current_page"><span className="page">{currentPage}</span></p>
      </div>
  
         <div className="card_container">
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
           }): <Loading/> } 

   
          </div>
    </div>
    
  );
}
