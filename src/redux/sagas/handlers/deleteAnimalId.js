import {put, takeEvery, call} from 'redux-saga/effects'
import { DELETE_ANIMAL_ID_FAILED, DELETE_ANIMAL_ID_REQUESTED, DELETE_ANIMAL_ID_SUCCESS } from '../../actions/types'
import deleteAnimalId from '../requests/deleteAnimalId'

function* handleDeleteAnimalId(action){
    try {
        const response = yield call(deleteAnimalId, action.payload.id) //dado da promise
        yield put({type: DELETE_ANIMAL_ID_SUCCESS, payload: {response, id: action.payload.id}}) //put recebe a action
    } catch (error) {
        console.log(error);
        yield put({type: DELETE_ANIMAL_ID_FAILED, error: error.message})
    }
}

function* whatcherDeleteAnimalId(){
    yield takeEvery(DELETE_ANIMAL_ID_REQUESTED, handleDeleteAnimalId) //pega qualquer action que tenha GET_ANIMALS_REQUESTED
}

export default whatcherDeleteAnimalId