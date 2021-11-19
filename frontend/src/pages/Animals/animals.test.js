import '@testing-library/jest-dom'
import {configureStore} from '@reduxjs/toolkit'
import {getAnimals} from  '../../redux/slice/animal.slice'
import animalsReducer from '../../redux/slice/animal.slice'
import { render, screen } from '@testing-library/react'



let store = configureStore({
    reducer:{
        animals: animalsReducer
    }
})
describe('Teste no componente animais',  ()=>{

    test('Resposta da requisição get animals', async ()=>{
        
        
        await store.dispatch(getAnimals());
    })
})
