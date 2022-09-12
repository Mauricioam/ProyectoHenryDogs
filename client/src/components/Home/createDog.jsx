import { useState, useEffect } from "react";
import { getTemperments, postDog } from "../../store/action";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "../styles/Create Dog/form.css";

export default function CreateDog() {
  const [input, setInput] = useState({
    temperament: [],
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

  function handleTempSelect(e) {
    if (input.temperament.includes(e.target.value)) {
      alert("Can't choose same temperament");
    } else if(input.temperament.length >= 10){
      alert("Max 10 temperament per dog!")
    } else {
      setInput((temp) => ({
        ...temp,
        temperament: [...temp.temperament, e.target.value],
      }));
    }
  }

  function resetTemp(e) {
    e.preventDefault();
    setInput({
      name: "",
      image: "",
      maxHeight: "",
      minHeight: "",
      maxWeight: "",
      minWeight: "",
      life_expectancy: "",
      description: "",
      temperament: [],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !error.name &&
      !error.maxWeight &&
      !error.minHeight &&
      !error.maxHeight &&
      !error.minWeight &&
      !error.image &&
      input.temperament.length
    ) {
      dispatch(postDog(input));
      alert("Dog Created");
      setInput({
        name: "",
        image: "",
        maxHeight: "",
        minHeight: "",
        maxWeight: "",
        minWeight: "",
        life_expectancy: "",
        description: "",
        temperament: [],
      });
    } else {
      alert("Ups something went wrong! , check the info");
    }
  }

  let dispatch = useDispatch();
  let temperaments = useSelector((state) => state.temperament);
  useEffect(() => {
    dispatch(getTemperments());
  }, []);

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit} className="form_info-Container">
        <div className="form_info">
      <h3 className="form_title"><span className="title_">Add your dog to the app!</span> </h3>
          <label className="label_form">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={input.name}
            autoComplete="off"
            required
            className="form_input"
          />
          {error.name && <p className="error_text">{error.name}</p>}
          <div className="height_container" >
          <label className="label_form">Max-Height</label>
          <input
            type="number"
            name="maxHeight"
            onChange={handleInputChange}
            value={input.maxHeight}
            placeholder="Cm"
            required
            className="form_input"
          />
         
          <label className="label_form">Min-Height</label>
          <input
            type="number"
            name="minHeight"
            onChange={handleInputChange}
            value={input.minHeight}
            placeholder="Cm"
            required
            className="form_input"
            />
          {error.maxHeight && <p className="error_text">{error.maxHeight}</p>}
          {error.minHeight && <p className="error_text">{error.minHeight}</p>} 
            
          </div>
          <div className="weight_container">
          <label className="label_form">Max-Weight</label>
          <input
            type="number"
            name="maxWeight"
            onChange={handleInputChange}
            value={input.maxWeight}
            placeholder="Kg"
            required
            className="form_input"
          />
         
          <label className="label_form">Min-Weight</label>
          <input
            type="number"
            name="minWeight"
            onChange={handleInputChange}
            value={input.minWeight}
            placeholder="Kg"
            required
            className="form_input"
          />
           {error.maxWeight && <p className="error_text">{error.maxWeight}</p>}
          {error.minWeight && <p className="error_text">{error.minWeight}</p>}
          </div>
          
          <label className="label_form">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            value={input.image}
            className="form_input"
          />
          {error.image && <p className="error_text">{error.image}</p>}
          <label className="label_form">Life span</label>
          <input
            type="number"
            name="life_expectancy"
            onChange={handleInputChange}
            value={input.life_expectancy}
            className="form_input"
          />
          {error.life_expectancy && <p className="error_text">{error.life_expectancy}</p>}

          <label className="label_form">Select Temperament </label>
          <select
            onChange={handleTempSelect}
            name="temperament"
            value={input.temperament}
            className="form_input"
          >
            <option>Select</option>
            {temperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <ul  className="list_temperament" >
            <li className="temperament">
              {input.temperament.length
                ? input.temperament.map((temp) => temp + " ")
                : ""}
            </li>
          </ul>


          <label className="label_form">Description</label>
          <textarea name="description" cols="2" rows="12" className="description_textArea" onChange={handleInputChange}
            value={input.description}/>
          <br />
          <br />
       
          <div className="button_container">
          <input type="submit" value="Create Dog" className="all_button" />
          <input type="reset" value="Reset Form" className="all_button" onClick={resetTemp} />
          <NavLink to="/home">
            <button className="all_button">Back to Home</button>
          </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name is required";
  } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
    error.name = "From a-z only, no numbers or special ch@racters!";
  }
  if (!input.minHeight || !input.maxHeight) {
    error.maxHeight = "Nedd height measures";
  } else if (Number(input.minHeight) > Number(input.maxHeight)) {
    error.minHeight = "Min-Height can't be greater than Max";
  } else if (Number(input.minHeight) === Number(input.maxHeight)) {
    error.minHeight = "Can't be equal";
  }

  if (!input.maxWeight || !input.minWeight) {
    error.maxWeight = "Need weigth field";
  } else if (Number(input.minWeight) > Number(input.maxWeight)) {
    error.minWeight = "Min-Height can't be greater than Max";
  } else if (Number(input.minWeight) === Number(input.maxWeight)) {
    error.minWeight = "Can't be equal";
  }

  if (input.image && !/\.(png|bmp|jpe?g)$/i.test(input.image)) {
    error.image = "Only .png, .jpg";
  }

  if (input.life_expectancy > 15) {
    error.life_expectancy = "Sure? The avarege dog lives about 10-13 years";
  }

  return error;
}
