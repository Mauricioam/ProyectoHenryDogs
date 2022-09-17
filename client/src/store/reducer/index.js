import {
  GET_DOGS,
  SEARCH_DOG,
  SIZE,
  SORT,
  GET_TEMPERAMENTS,
  TEMPERAMENTS,
  POST_DOG,
  SORT_CREATED,
  DOG_ID,
  CLEAR,
} from "../action";

const initialState = {
  dogs: [],
  dogsFiltered: [],
  temperament: [],
  idDogs: [],
  foundDog: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        dogsFiltered: action.payload,
      };
    case SEARCH_DOG:
      return {
        ...state,
        dogsFiltered: action.payload,
      };
    case SORT:
       
      let order = [...state.dogsFiltered].sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === "fromAtoZ" ? 1 : -1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === "fromZtoA" ? 1 : -1;
        }
        return 0;
      });
      console.log(order)
      console.log(state.dogsFiltered)
      return {
        ...state,
        dogsFiltered: order,
      };
    case SIZE:
      let filterDog = state.dogsFiltered.filter((dog) => dog.weight !== "NaN");
      let dogNoWeigth = state.dogsFiltered.filter((dog) => dog.weight == "NaN");

      filterDog.sort((a, b) => {
        if (parseInt(a.weight) < parseInt(b.weight)) {
          return action.payload === "big" ? 1 : -1;
        }
        if (parseInt(a.weight) > parseInt(b.weight)) {
          return action.payload === "small" ? 1 : -1;
        }
        return 0;
      });
      let result = filterDog.concat(dogNoWeigth);
      return {
        ...state,
        dogsFiltered: result,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperament: action.payload,
      };
    case TEMPERAMENTS:
         let orderByTemp = [];
      for (let i = 0; i < state.dogsFiltered.length; i++) {
        if (state.dogsFiltered[i].temperament.includes(action.payload)) {
          orderByTemp.push(state.dogsFiltered[i]);
        } 
      } 
      /* console.log(state.dogsFiltered,"perros")
        let orderByTemp = state.dogsFiltered.filter(dog => dog.temperament.includes(action.payload))
        console.log(orderByTemp) */
      return {
        ...state,
        dogsFiltered: orderByTemp
      };
    case POST_DOG:
      return {
        ...state,
      };
    case SORT_CREATED:
      let orderByCreated =
        action.payload.order === "created"
          ? state.dogsFiltered.filter((d) => typeof d.id !== "number")
          : action.payload.dogs;

      return {
        ...state,
        dogsFiltered:
          action.payload.order === "all" ? action.payload.dogs : orderByCreated,
      };
    case DOG_ID:
      return {
        ...state,
        idDogs: action.payload,
      };
    case CLEAR: {
      return {
        ...state,
        idDogs: [],
      };
    }
    default:
      return state;
  }
}
