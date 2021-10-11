import api from "../../../utils/api";

const getAllAnimals = () => {
    return api.get("/animais").then(response => response.data)
            .catch(err => {throw err})
}

export default getAllAnimals