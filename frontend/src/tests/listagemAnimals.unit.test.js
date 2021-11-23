import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent} from '@testing-library/react'
import { MemoryRouter, Router , Route} from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createMemoryHistory } from 'history'
import Animals from '../pages/Animals/animals'
import { selectAllAnimals } from '../redux/slice/animal.slice'

const mockState = {
    animals: {
        status: 'EMPTY',
        entities: [
            {id:1, nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 },
            {id:2, nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 }
        ],
    }
}

jest.mock("../redux/slice/animal.slice", ()=>{
    return {
        selectAllAnimals: jest.fn(),
        getAllAnimals: jest.fn()
    }
})

jest.mock('react-redux', ()=>{
    return {
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn(),
        useDispatch: jest.fn()
        
    }
})
describe('Listagem animals', ()=>{
    test('se deleteAnimals está sendo chamada',()=>{
        useDispatch.mockImplementation(()=>jest.fn((param)=>param))
        useSelector.mockImplementation(callback =>{
            return callback(mockState)
        })
        selectAllAnimals.mockImplementation(()=>mockState.animals.entities)
        const history = createMemoryHistory({ initialEntries: ["/"] });
        const animal = {
            nome: "totó",
            tipo: "cachorro",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        const animalCreate = render(
        
                <Router history={history}>
                    <Animals></Animals>
                </Router>
        )
    })
})

