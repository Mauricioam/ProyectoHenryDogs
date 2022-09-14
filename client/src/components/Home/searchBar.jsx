import { useState } from "react";
import { useDispatch  } from "react-redux";
import { searchDog } from "../../store/action";
import {style} from "../styles/SearchBar/searchBar.css"

export default function SearchBar() {
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
      dispatch(searchDog(search))
      setSearch("");
    
    
  }

  function inputChange(event) {
    setSearch(event.target.value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={inputChange} value={search} required className="search_input"  placeholder="Search"/>
        <button type="submit" className="all_button"><span className="button_text">Search</span></button>
 
      </form>
    </div>
  );
}
