import api from "../../../utils/api";

const deleteAnimalId = (id)=>{
    return api.delete(`/animals/${id}`).then(response=>response.data).catch(error =>{ 
        throw error})
}

export default deleteAnimalId