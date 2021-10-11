import * as type from '../../actions/types'


const initialState = {
    animals: [],
    loading: false,
    error: null,
    response: {}
}
export default function animals (state=initialState, action){

    switch (action.type){
        case type.GET_ANIMALS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_ANIMALS_SUCCESS:
            return {
                ...state,
                loading: false,
                animals: action.animals,
                error: null
            }
        case type.GET_ANIMALS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case type.DELETE_ANIMAL_ID_REQUESTED:
                return {...state, loading: true}
        case type.DELETE_ANIMAL_ID_SUCCESS:
            const newAnimals = state.animals.filter(animal =>animal.id !== action.payload.id)
            console.log(newAnimals, state);
            return { ...state, animals: newAnimals,loading: false, response: action.response};
        case type.DELETE_ANIMAL_ID_FAILED:
                return { ...state, loading: false, error: action.error};
        default:
                return state;
    }
}