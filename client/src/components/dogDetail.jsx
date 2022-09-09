import { NavLink } from "react-router-dom";
import {  useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById } from "../store/action";


export default function DetailDog(){
const {id} = useParams()
console.log(id)
let idDogs = useSelector(state => state.idDogs)
let dispatch = useDispatch()
useEffect(()=>{
        dispatch(getDogById(id))
},[dispatch,id])
console.log(idDogs)
 return(
        
    <div>
       <h3>{idDogs[0].name}</h3>
       <img src={idDogs[0].image} alt="dog"/>
       <p><span>Behavior:</span> {idDogs[0].temperament}</p>
       <p><span>Height:</span> {idDogs[0].height} Cm</p> 
       <p><span>Weight:</span> {idDogs[0].weight} Kg</p> 

        <NavLink to="/home">
       <button>Back To Home</button>
       </NavLink>
   </div> 
) 
   
 
 
  
   

}
