import { all } from "@redux-saga/core/effects";

import whatcherGetAllAnimalsSaga from "./handlers/getAllAnimals";

export default function* rootSaga(){
    yield all([
        whatcherGetAllAnimalsSaga(),
    ])
}