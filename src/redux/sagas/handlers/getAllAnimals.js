import {put, takeEvery, call} from 'redux-saga/effects'
import getAllAnimals from '../requests/getAllAnimals'
import {GET_ANIMALS_REQUESTED, GET_ANIMALS_SUCCESS, GET_ANIMALS_FAILED} from "../../actions/types"

function* handleGetAllAnimals(){
    try {
        const animals = yield call(getAllAnimals) //dado da promise
        yield put({type: GET_ANIMALS_SUCCESS, animals: animals}) //put recebe a action
    } catch (error) {
        yield put({type: GET_ANIMALS_FAILED, response: error.response})
    }
}

function* whatcherGetAllAnimalsSaga(){
    yield takeEvery(GET_ANIMALS_REQUESTED, handleGetAllAnimals) //pega qualquer action que tenha GET_ANIMALS_REQUESTED
}

export default whatcherGetAllAnimalsSaga