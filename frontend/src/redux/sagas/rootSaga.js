import { all } from "@redux-saga/core/effects";
import whatcherDeleteAnimalId from "./handlers/deleteAnimalId";
import whatcherGetAllAnimalsSaga from "./handlers/getAllAnimals";
import  whatcherPostAnimal from "./handlers/postAnimal"
import whatcherUpdateAnimal from "./handlers/updateAnimal";
export default function* rootSaga(){
    yield all([
        whatcherGetAllAnimalsSaga(),
        whatcherPostAnimal(),
        whatcherDeleteAnimalId(),
        whatcherUpdateAnimal()
    ])
}