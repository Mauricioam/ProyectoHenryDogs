import { GET_DOGS, SEARCH_DOG, SIZE, SORT,GET_TEMPERAMENTS,TEMPERAMENTS } from "../action"


const initialState = {
    dogs: [],
    dogsFiltered : [],
    temperament: []

}

export default function reducer( state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                dogsFiltered:action.payload
            }
        case SEARCH_DOG:
            return {
                ...state,
                dogs:action.payload
            }
        case SORT:
            let order = state.dogsFiltered.sort((a,b)=>{
                if (a.name > b.name){
                    return action.payload === "fromAtoZ" ? 1 : -1
                }
                if(a.name < b.name){
                    return action.payload === "fromZtoA" ? 1 : -1
                }
                return 0
             }) 
            return{
                   ...state,
                   dogs: order
                }
        case SIZE:
            let orderSize = state.dogsFiltered.sort((a,b)=>{
                if (parseInt(a.weight)  < parseInt(b.weight)){
                    return action.payload === "big" ? 1 : -1
                }
                if(parseInt(a.weight) > parseInt(b.weight)){
                    return action.payload === "small" ? 1 : -1
                }
                return 0
            })
            return{
                ...state,
                dogs: orderSize
            }
            case GET_TEMPERAMENTS:
            return{
                ...state,
                temperament: action.payload
            }
            case TEMPERAMENTS:
                let orderByTemp =state.dogsFiltered.filter(item => item.temperament == (action.payload))
                
                 
                console.log(orderByTemp)
                console.log(state.dogsFiltered[0])
                return{
                    ...state,
                    dogs: orderByTemp

                }
        default:
            return state
                
            
    }

}   
