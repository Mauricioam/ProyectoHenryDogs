import { useState } from "react"



export default function CreateDog(){
    const [input,setInput] = useState({
   
      temperament : []  
    })
    const [error,setError] = useState({})

    function handleInputChange(e){
        setInput({
        ...input,
        [e.target.name]: e.target.value
        })
    
    }
    return (
        
        <div>
            <form>
            <label>Name</label>
            <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={input.name}
                required/>

            <label>Max-Height</label>
            <input
             type="number"
             name="maxHeight"
             onChange={handleInputChange}
             value={input.maxHeight}
             required/>

            <label>Min-Height</label>
            <input
             type="number"
             name="minHeight"
             onChange={handleInputChange}
             value={input.minHeight}
             required/>

            <label>Max-Weight</label>
            <input
             type="number"
             name="maxWeight"
             onChange={handleInputChange}
             value={input.maxWeight}
             required/>

            <label>Min-Weight</label>
            <input
             type="number"
             name="minWeight"
             onChange={handleInputChange}
             value={input.minWeight}
             required/>


            <label>Image</label>
            <input
             type="text"
             name="image"
             onChange={handleInputChange}
             value={input.image}
             required/>

            <label>Life span</label>
            <input
             type="number"
             name="life_expectancy"
             onChange={handleInputChange}
             value={input.life_expectancy}/>
             

            <label>Description</label>
            <input
             type="text"
             name="description"
             onChange={handleInputChange}
             value={input.description}
             required/>

            <label>Temperament</label>
            <option></option>

            <input type="submit" value="Create Dog"/>
            </form>
        </div>
    )
}

function validate(input){
    let errors = {}
    if(!input.name){
        return (errors.name = "Name is required")
    } else if(!/[a-zA-Z]+/.test(input.name)){
        return (errors.name = "From a-z only, no numbers or special ch@racters!")
    }
    if(!input.maxHeight || !input.minHeight){
        return (errors.maxHeight ="Empty field not allowed",errors.maxHeight ="Empty field not allowed")
    } else if(input.minHeight > input.maxHeight ) return errors.name = "Not allowed! Check Min-Max relation"
    if(!input.maxWeight || !input.minWeight){
        return (errors.maxWeight ="Empty field not allowed",errors.minWeight ="Empty field not allowed")
    } else if(input.minWeight > input.maxWeight ) return errors.name = "Not allowed! Check Min-Max relation"

    if(!input.image)return "Image is required"
    else if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input.image)) return errors.name = "Only URL link"
}