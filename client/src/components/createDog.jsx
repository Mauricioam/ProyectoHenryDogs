import { useState } from "react"



export default function CreateDog(){
    const [input,setInput] = useState("")
    return (
        <div>
            <form>
            <laberl>Name</laberl>
            <input/>

            <laberl>Max-Height</laberl>
            <input/>

            <laberl>Name</laberl>
            <input/>

            <laberl>Name</laberl>
            <input/>

            <laberl>Name</laberl>
            <input/>

            <laberl>Name</laberl>
            <input/>

            </form>
        </div>
    )
}