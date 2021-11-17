import { combineReducers } from "redux";
import animals from "./Animal/animals.reducer"
const reducers = combineReducers({
    animalsReducer: animals,
})

export default reducers