import {put, takeEvery, call} from 'redux-saga/effects'
import postAnimal from '../requests/postAnimal'
import {SAVE_ANIMAL_FAILED, SAVE_ANIMAL_REQUESTED, SAVE_ANIMAL_SUCCESS} from "../../actions/types"

function* handlerPostAnimal(action){
    try {
        const response = yield call(postAnimal, action.payload) //injeta action.payload no parametro da função chamada
        yield put({type: SAVE_ANIMAL_SUCCESS, response: response})
        
    } catch(err){
       
        yield put({type: SAVE_ANIMAL_FAILED, response: err.response})
    }
}

function* whatcherPostAnimal(){
    yield takeEvery(SAVE_ANIMAL_REQUESTED, handlerPostAnimal)
}

export default whatcherPostAnimal