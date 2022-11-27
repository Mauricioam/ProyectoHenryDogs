import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById, unMount } from "../../store/action";
import  "../styles/DetailCard/detailCard.css";
import Loading from "../Loading/loading";

export default function DetailDog() {
  const { id } = useParams();
  
  let idDogs = useSelector((state) => state.idDogs);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogById(id));
    return () => {
      dispatch(unMount());
    };
  }, [dispatch, id]);

  return (
    <>
    {
      idDogs.length ?   ( 
         <div className="detail_container">
      <div className="image_container">
        <img src={idDogs[0]?.image} alt="dog" className="detail_image" />
      </div>
 
      <div className="info_container">
        <div className="title_container">
        <h3 className="detail_name">{idDogs[0]?.name}</h3>
        </div>
        <div className="text_container">
        <p>
          <span className="detail_subtitle">Behavior:</span>{" "}
          {idDogs[0]?.temperament}
        </p>
        <p>
          <span className="detail_subtitle">Height:</span> {idDogs[0]?.height}{" "}
          Cm
        </p>
        <p>
          <span className="detail_subtitle">Weight:</span> {idDogs[0]?.weight}{" "}
          Kg
        </p>
        <p>
          <span className="detail_subtitle">Life Span:</span> {idDogs[0]?.life_expectancy}{" "}
          
        </p>

        </div>
      
        <NavLink to="/home">
          <div className="detail_button">
          <button className="all_button">Back To Home</button>
          </div>
        </NavLink>
      </div>
    </div>) : <Loading/>
    }
  
  </>
  );
}
