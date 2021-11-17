import * as type from '../../actions/types'


const initialState = {
    animals: [],
    loading: false,
    error: false,
    response: {}
}
export default function animals(state = initialState, action) {

    switch (action.type) {
        case type.GET_ANIMALS_REQUESTED:
            return {
                ...state,
                loading: true,
                error: false          
            }
        case type.GET_ANIMALS_SUCCESS:
            return {
                ...state,
                loading: false,
                animals: action.animals,
                error: false
            }
        case type.GET_ANIMALS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case type.DELETE_ANIMAL_ID_REQUESTED:
            return { ...state, loading: true, error: false }

        case type.DELETE_ANIMAL_ID_SUCCESS:
            const newAnimals = state.animals.filter(animal => animal.id !== action.payload.id)
            return { ...state, animals: newAnimals, loading: false, response: action.response, error: false};

        case type.DELETE_ANIMAL_ID_FAILED:
            return { ...state, loading: false, error: action.error, response: action.response };

        case type.SAVE_ANIMAL_REQUESTED:            
            return { ...state, loading: true}
        
        case type.SAVE_ANIMAL_SUCCESS:
            const newAnimal = action.response.data
            state.animals.push(newAnimal)
            const newState = { ...state, loading: false, response: action.response, error: false}
            
            return newState;
        
        case type.SAVE_ANIMAL_FAILED:
            return { ...state, loading: false, error: true, response: action.response};

        case type.UPDATE_ANIMAL_ID_REQUESTED:
            return { ...state, loading: true }

        case type.UPDATE_ANIMAL_ID_SUCCESS:
            return {...state, loading: false, response: action.response };

        case type.UPDATE_ANIMAL_ID_FAILED:
            return { ...state, loading: false, error: action.response };

        default:
            return state;
    }
}