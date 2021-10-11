import { all } from "@redux-saga/core/effects";

import whatcherGetAllAnimalsSaga from "./handlers/getAllAnimals";
import  whatcherPostAnimal from "./handlers/postAnimal"
export default function* rootSaga(){
    yield all([
        whatcherGetAllAnimalsSaga(),
        whatcherPostAnimal(),
    ])
}