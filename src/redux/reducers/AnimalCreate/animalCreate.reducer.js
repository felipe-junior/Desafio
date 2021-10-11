import * as type from '../../actions/types'

const initialState = {
    response: {},
    loading: false,
    error: false,
};
const animalCreateReducer= function (state=initialState, action){
    switch (action.type) {
        case type.SAVE_ANIMAL_REQUESTED:
           
            return {...state, loading: true}
        case type.SAVE_ANIMAL_SUCCESS:
            return { loading: false, response: action.response};
        case type.SAVE_ANIMAL_FAILED:
            return { ...state, loading: false, error: action.error};

        case type.UPDATE_ANIMAL_ID_REQUESTED:
            return {...state, loading: true}
        case type.UPDATE_ANIMAL_ID_SUCCESS:
            return { loading: false, response: action.response};
        case type.UPDATE_ANIMAL_ID_FAILED:
            return { ...state, loading: false, error: action.error};
        default:
            return state
    }
}
export default animalCreateReducer