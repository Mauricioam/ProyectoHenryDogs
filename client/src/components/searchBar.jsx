import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchDog } from "../store/action"

export default function SearchBar(){
const [search,setSearch] = useState("")
let dispatch = useDispatch()



function onSubmit(event){
    event.preventDefault()
    try {
        dispatch(searchDog(search))
        
    } catch (error) {
        alert()
    }
    
}

function inputChange(event){
    setSearch(event.target.value)
}
   return (
    <div>
            <form onSubmit={onSubmit}>
            <input type="text" onChange={inputChange} value={search} required/>
            <input type="submit" value="Search"/>
            </form>


    </div>)
}