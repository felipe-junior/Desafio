import * as type from '../types'

export  function getAllAnimals (){
    return{
        type: type.GET_ANIMALS_REQUESTED
    }
}
export  function getAnimals (payload){
    return {
        type: type.GET_ANIMALS_REQUESTED,
    }
}

