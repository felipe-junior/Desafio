import api from "./api"


export const httpGetAnimals = async ()=>{
    return api.get("/animals").then(response => response.data)
    .catch(err => {throw err})
}

export const  httpDeleteAnimal = async (id)=>{
    return api.delete(`/animals/${id}`).then(response=>response.data).catch(error =>{ throw error})
}

export const httpPostAnimal = async (animal) =>{
    return api.post("/animals", animal).then(response => response.data).catch(err=>{throw err})
}

export const httpUpdateAnimal= async (animal) =>{
    const {id} = animal 
    return api.put(`/animals/${id}`, animal).then(response => response).catch(err=>{throw err})
}