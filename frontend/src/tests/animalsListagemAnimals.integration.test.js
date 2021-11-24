import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent} from '@testing-library/react'
import { MemoryRouter, Router , Route} from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import { selectAllAnimals } from '../redux/slice/animal.slice'
import Animals from '../pages/Animals/animals'
import { useDispatch, useSelector } from 'react-redux'

import {createMemoryHistory} from 'history'
const mockState = {
    animals: {
        status: 'EMPTY',
        entities: [
        ],
    }
}

jest.mock('../redux/slice/animal.slice', ()=>{
    return {
        ...jest.requireActual('../redux/slice/animal.slice'),
        selectAllAnimals: jest.fn()
    }
})
jest.mock('react-redux', ()=>{
    return {
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn(),
        useDispatch: jest.fn()
        
    }
})
describe('Componente Animals (tabela) X ListagemAnimals Componente', ()=>{
    beforeEach(()=>{
        useDispatch.mockImplementation(()=>jest.fn((param)=>{
            return param
        }))
        useSelector.mockImplementation(callback =>{
            return callback(mockState)
        })
        selectAllAnimals.mockImplementation(()=>mockState.animals.entities)
    })
    test('Exibição de N animais - Tabela animais integrado com Listagem de animals', ()=>{
        const animals = []
        for (let i = 1; i < 10; i++) {
            animals.push({id:i, nome: "Animal " + i, tipo: "", dataNascimento: Date.now(), peso: 10.0 })
        }
        mockState.animals.entities = animals
        const history = createMemoryHistory({ initialEntries: ["/"] });
        const {container}= render(
                <Router history={history}>
                    <Animals></Animals>
                </Router>
        )
        for (let i = 1; i < 10; i++) {
            expect(screen.getByText('Animal ' + i)).toBeInTheDocument()
        }
    })

})