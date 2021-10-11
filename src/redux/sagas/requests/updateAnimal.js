import api from "../../../utils/api";

const updateAnimal= (data) =>{
    const {id, ...animal} = data 
    return api.put(`/animais/${id}`, data).then(response => response)
    .catch(err=>{throw err})
}

export default updateAnimal