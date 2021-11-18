import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../utils/api'

const animalsAdapter = createEntityAdapter()

export const statusConsts = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
    EMPTY: 'empty'
}
const initialState = animalsAdapter.getInitialState({
    status: statusConsts.EMPTY
})


//Requests
export const getAnimals = createAsyncThunk('animals/getAnimals', async ()=>{
    return  api.get("/animals").then(response => response.data)
    .catch(err => {throw err})
})

export const  deleteAnimalById = createAsyncThunk('animals/deleteAnimalById',async (id)=>{
        api.delete(`/animals/${id}`).then(response=>response.data).catch(error =>{ throw error})
        return id
})

export const postAnimal =createAsyncThunk('animals/postAnimal', async (animal) =>{
    return api.post("/animals", animal).then(response => response.data)
    .catch(err=>{throw err})
})

export const updateAnimal= createAsyncThunk('animals/updateAnimal', async (animal) =>{
    const {id} = animal 
    return api.put(`/animals/${id}`, animal).then(response => response)
    .catch(err=>{throw err})
})

export const animalsSlice = createSlice({
    name: 'animals',
    initialState,
    reducers: {
       
        
    },
    extraReducers: {
        [getAnimals.fulfilled]: (state, action) =>{
            state.status = statusConsts.SUCCESS
            console.log(action);
            animalsAdapter.setAll(state, action.payload)
        },
        [getAnimals.pending]: (state, action) =>{
            state.status = statusConsts.LOADING
        },
        [getAnimals.rejected]: (state, action) =>{
            state.status = statusConsts.ERROR
        },
        [deleteAnimalById.fulfilled]: (state, action) =>{
            const {id} = action.payload
            state.status = statusConsts.SUCCESS
            animalsAdapter.removeOne(state, id)
        },
        [deleteAnimalById.pending]: (state, action) =>{
            state.status = statusConsts.LOADING
        },
        [deleteAnimalById.rejected]: (state, action) =>{
            state.status = statusConsts.ERROR
        },
        [postAnimal.fulfilled]: (state, action) =>{
            const animal = action.payload
            console.log(animal, "Animal");
            state.status = statusConsts.SUCCESS
            animalsAdapter.addOne(state, animal)
            
        },
        [postAnimal.pending]: (state, action) =>{
            state.status = statusConsts.LOADING
        },
        [postAnimal.rejected]: (state, action)=>{
            state.status = statusConsts.ERROR
        },
        [updateAnimal.fulfilled]: (state, action) =>{
            const animal = action.payload
            console.log(animal, "Animal");
            state.status = statusConsts.SUCCESS
            animalsAdapter.addOne(state, animal)
            
        },
        [updateAnimal.pending]: (state, action) =>{
            state.status = statusConsts.LOADING
        },
        [updateAnimal.rejected]: (state, action)=>{
            state.status = statusConsts.ERROR
        }  
    }  
})

export default animalsSlice.reducer

export const {
     selectAll: selectAllAnimals,
     selectById: selectAnimalById
} = animalsAdapter.getSelectors(state => state.animals)