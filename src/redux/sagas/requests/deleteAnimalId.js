import api from "../../../utils/api";

const deleteAnimalId = (id)=>{
    return api.delete(`/animais/${id}`).then(response=>response.data).catch(error =>{ 
        console.log(error)
        throw error})
}

export default deleteAnimalId