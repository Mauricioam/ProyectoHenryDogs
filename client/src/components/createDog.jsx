import { useState, useEffect } from "react";
import { getTemperments,postDog } from "../store/action";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";


export default function CreateDog() {
  const [input, setInput] = useState({
    temperament : []
  });
  const [error, setError] = useState({});

  function handleInputChange(e) {
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
        
      })
    
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleTempSelect(e){
    if(input.temperament.includes(e.target.value)){
      alert("Can't choose same temperament")
    } else {
      setInput((temp)=> ({
        ...temp,
        temperament: [...temp.temperament,  e.target.value]
      }))
    }
  }


  function resetTemp(e){
    e.preventDefault()
    setInput({
      name:"",
      image:"",
      maxHeight:"",
      minHeight:"",
      maxWeight:"",
      minWeight:"",
      life_expectancy:"",
      description:"",
      temperament : []
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!error.name && !error.maxWeight && !error.minHeight && !error.maxHeight && !error.minWeight && !error.image && input.temperament.length){
      dispatch(postDog(input)) 
      alert("Dog Created")
      setInput({
        name:"",
        image:"",
        maxHeight:"",
        minHeight:"",
        maxWeight:"",
        minWeight:"",
        life_expectancy:"",
        description:"",
        temperament : []
      })
    } else {
      alert("Ups something went wrong! , check the info")
    }

  }



  let dispatch = useDispatch();
  let temperaments = useSelector((state) => state.temperament);
  useEffect(() => {
    dispatch(getTemperments());
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={input.name}
          required
        />
        {error.name && <p>{error.name}</p>}
        <label>Max-Height</label>
        <input
          type="number"
          name="maxHeight"
          onChange={handleInputChange}
          value={input.maxHeight}
          required
        />
        {error.maxHeight && <p>{error.maxHeight}</p>}
        <label>Min-Height</label>
        <input
          type="number"
          name="minHeight"
          onChange={handleInputChange}
          value={input.minHeight}
          required
        />
        {error.minHeight && <p>{error.minHeight}</p>}
        <label>Max-Weight</label>
        <input
          type="number"
          name="maxWeight"
          onChange={handleInputChange}
          value={input.maxWeight}
          required
        />
        {error.maxWeight && <p>{error.maxWeight}</p>}
        <label>Min-Weight</label>
        <input
          type="number"
          name="minWeight"
          onChange={handleInputChange}
          value={input.minWeight}
          required
        />
        {error.minWeight && <p>{error.minWeight}</p>}
        <label>Image</label>
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
          value={input.image}
          
        />
        
        {error.image && <p>{error.image}</p>}
        <label>Life span</label>
        <input
          type="number"
          name="life_expectancy"
          onChange={handleInputChange}
          value={input.life_expectancy}
        />
        {error.life_expectancy && <p>{error.life_expectancy}</p>}
        <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={handleInputChange}
          value={input.description}
          
        />
      <br />
      <br />
        <label>Select Temperament </label>
        <select onChange={handleTempSelect}
        name="temperament"
        value={input.temperament}>
          <option>Select</option>
          {temperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>
        <ul>
          <li>{ input.temperament.length ? input.temperament.map(temp => temp + ","): ("Add at least one temperament") }</li>
        </ul>
        
            
        <input type="submit" value="Create Dog" /> <input type="reset" value="Reset Form" onClick={resetTemp}/>
        <NavLink to="/home"><button>Back to Home</button></NavLink>
      </form>
    </div>
  );
}

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name is required";
  } else if (!/[a-zA-Z]+/i.test(input.name)) {
    error.name = "From a-z only, no numbers or special ch@racters!";
  }
  if ( !input.minHeight || !input.maxHeight) {
    (error.maxHeight = "Empty field")
  } else if( Number(input.minHeight) >  Number(input.maxHeight) ){
   error.minHeight = "Min-Height can't be greater than Max";
  } else if(Number(input.minHeight) ===  Number(input.maxHeight) ){
    error.minHeight = "Can't be equal"
  }
    
 

  if ( !input.maxWeight || !input.minWeight) {
    (error.maxWeight = "Empty field")
  } else if( Number(input.minWeight) >  Number(input.maxWeight) ){
   error.minWeight = "Min-Height can't be greater than Max";
  } else if(Number(input.minWeight) ===  Number(input.maxWeight) ){
    error.minWeight = "Can't be equal"
  }
    
 
  if (
    input.image && !(/\.(png|bmp|jpe?g)$/i).test(
      input.image
    )
  ) {
    error.image = "Only .png, .jpg";
  } 
   
  
  if (input.life_expectancy > 15) {
    error.life_expectancy = "Sure? The avarege dog lives about 10-13 years";
  }

  return error;
}
