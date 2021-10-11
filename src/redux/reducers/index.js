import { combineReducers } from "redux";
import animals from "./Animals/animals.reducer"
import animalCreateReducer from "./AnimalCreate/animalCreate.reducer";
const reducers = combineReducers({
    animals,
    animalPostResponse: animalCreateReducer,
})

export default reducers