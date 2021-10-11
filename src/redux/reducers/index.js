import { combineReducers } from "redux";
import animals from "./Animals/animals.reducer"
const reducers = combineReducers({
    animals,
})

export default reducers