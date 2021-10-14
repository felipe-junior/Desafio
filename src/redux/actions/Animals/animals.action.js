import * as type from '../types'

export  function getAllAnimals (payload){
    return{
        type: type.GET_ANIMALS_REQUESTED,
    }
}

export function saveAnimal(payload){
    return{
        type: type.SAVE_ANIMAL_REQUESTED,
        payload: payload
    }
}
export function updateAnimal(payload){
    return{
        type: type.UPDATE_ANIMAL_ID_REQUESTED,
        payload: payload
    }
}
export function deleteAnimal(payload){
    return{
        type: type.DELETE_ANIMAL_ID_REQUESTED,
        payload: payload
    }
}
