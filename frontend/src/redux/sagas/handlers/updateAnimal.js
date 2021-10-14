import {put, takeEvery, call} from 'redux-saga/effects'
import updateAnimal from '../requests/updateAnimal'
import {UPDATE_ANIMAL_ID_FAILED, UPDATE_ANIMAL_ID_SUCCESS, UPDATE_ANIMAL_ID_REQUESTED} from "../../actions/types"

function* handlerUpdateAnimal(action){
    try {
        const response = yield call(updateAnimal, action.payload) //injeta action.payload no parametro da função chamada
        yield put({type: UPDATE_ANIMAL_ID_SUCCESS, response})
        
    } catch(err){
        yield put({type: UPDATE_ANIMAL_ID_FAILED, response: err.response})
    }
}

function* whatcherUpdateAnimal(){
    yield takeEvery(UPDATE_ANIMAL_ID_REQUESTED, handlerUpdateAnimal)
}

export default whatcherUpdateAnimal