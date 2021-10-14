import api from "../../../utils/api";

const updateAnimal= (data) =>{
    const {id} = data 
    return api.put(`/animals/${id}`, data).then(response => response)
    .catch(err=>{throw err})
}

export default updateAnimal