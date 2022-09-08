
import {  useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById } from "../store/action";
export default function DetailDog(){
  
const {id} = useParams()

let idDogs = useSelector((state) => state.idDogs)
let dispatch = useDispatch()
useEffect(()=>{
        dispatch(getDogById(id))
}
)
console.log(idDogs)
return(
    <div>
    </div>
)
}
