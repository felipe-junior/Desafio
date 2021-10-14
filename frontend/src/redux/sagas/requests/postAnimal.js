import api from "../../../utils/api";

const postAnimal= (data) =>{
    return api.post("/animals", data).then(response => response)
    .catch(err=>{throw err})
}

export default postAnimal