import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent} from '@testing-library/react'
import { MemoryRouter, Router , Route} from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createMemoryHistory } from 'history'
import Animals from '../pages/Animals/animals'
import { deleteAnimalById } from '../redux/slice/animal.slice'
import { LinhaTabelaAnimals } from '../pages/Animals/ListagemAnimals'

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
        deleteAnimalById: jest.fn()
    }
})
jest.mock('react-redux', ()=>{
    return {
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn(),
        useDispatch: jest.fn()
        
    }
})
const animals = [
    {id:1, nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 },
    {id:2, nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 }
]
describe('Listagem animals', ()=>{
    beforeEach(()=>{
        useDispatch.mockImplementation(()=>jest.fn((param)=>{
            return param
        }))
        useSelector.mockImplementation(callback =>{
            return callback(mockState)
        })
    })
    
    test('se deleteAnimals está sendo chamada 1 vez ao clicar em excluir',()=>{
        
        const history = createMemoryHistory({ initialEntries: ["/"] });
        const {container}= render(
                <Router history={history}>
                    <LinhaTabelaAnimals animals={animals}></LinhaTabelaAnimals>
                </Router>
        )
        const leftClick = {button: 0}
        userEvent.click(container.querySelector('#buttonDelete'), leftClick)
        expect(deleteAnimalById).toHaveBeenCalledTimes(1)
    })

    test('Se o caminho está sendo alterado ao clicar em alterar', ()=>{
        const history = createMemoryHistory();
        const {container}= render(
                <Router history={history}>
                    <LinhaTabelaAnimals animals={animals}></LinhaTabelaAnimals>
                </Router>
        )
        const leftClick = {button: 0}
        userEvent.click(container.querySelector('#buttonUpdate1'), leftClick)
        expect(history.location.pathname).toBe('/animais/alterar/1')
    })
})
