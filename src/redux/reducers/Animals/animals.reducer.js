import * as type from '../../actions/types'


const initialState = {
    animals: [],
    loading: false,
    error: null,
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
                animals: action.animals
            }
        case type.GET_ANIMALS_FAILED:
            console.log(action)
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;

    }
}