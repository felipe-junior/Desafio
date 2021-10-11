import api from "../../../utils/api";

const postAnimal= (data) =>{
    return api.post("/animais", data).then(response => response)
    .catch(err=>{throw err})
}

export default postAnimal