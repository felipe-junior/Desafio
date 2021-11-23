import '@testing-library/jest-dom'
import { render, screen, fireEvent} from '@testing-library/react'
import { MemoryRouter, Router , Route} from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import { useDispatch, useSelector } from 'react-redux'
import { createMemoryHistory } from 'history'
import React from 'react'
import AnimalCreate from '../pages/AnimalCreate/animalCreate'
import { setStatus, postAnimal, updateAnimal, selectAnimalById } from '../redux/slice/animal.slice'
import { statusConsts } from '../redux/slice/statusConsts'
import { useState } from 'react'

jest.mock('react-redux', ()=>{
    return {
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn(),
        useDispatch: jest.fn()
        
    }
})
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
        postAnimal: jest.fn(),
        updateAnimal: jest.fn(),
        setStatus: jest.fn(),
        selectAnimalById: jest.fn()
    }
})



describe('Teste no form de criação de animais', ()=>{
    beforeEach(()=>{
        useSelector.mockImplementation(callback =>{
            return callback(mockState)
        })
        useDispatch.mockImplementation(()=>jest.fn((param)=>param))
        postAnimal.mockImplementation(()=> {
            mockState.animals.status = statusConsts.SUCCESS
            mockState.animals.entities.push({id: 3, nome: "totó", tipo: "", dataNascimento: new Date('2010-05-10'), peso: 10.0 })
        })
    })
    test('Se existe botão de save', ()=>{
        const idButton = '#saveButton'
        const history = createMemoryHistory();
        const {container} = render(
            <Router history={history}>
                    <AnimalCreate></AnimalCreate>
            </Router>
        )
        expect(container.querySelector(idButton)).toBeTruthy()
    })

    test('Se a função postAnimal está sendo chamada', ()=>{
        
        const history = createMemoryHistory();
        const {container} =render(
            <Router history={history}>
                    <AnimalCreate></AnimalCreate>
            </Router>
        )
        const id = 3
        const expectedAnimal = {id: id, nome: "totó", tipo: "", dataNascimento:  new Date('2010-05-10'), peso: 10.0 }
        const saveButton = container.querySelector("#saveButton")
        expect(saveButton).not.toBeNull()
        fireEvent.click(saveButton)
        expect(mockState.animals.entities.filter(animal => animal.id === id)[0]).toEqual(expectedAnimal)
        expect(postAnimal).toHaveBeenCalledTimes(1)
    })
    test('se existe botão de voltar', ()=>{
        const history = createMemoryHistory();
        const {container} =render(
            <Router history={history}>
                    <AnimalCreate></AnimalCreate>
            </Router>
        )
        const voltarButton = container.querySelector("#voltarButton")
        expect(voltarButton).toBeTruthy()
    })

    test('Se a função updateAnimal está sendo chamada', ()=>{
        const animalId = 1
        const history = createMemoryHistory();
        const {container} =render(
            <MemoryRouter initialEntries={[`/animais/alterar/${animalId}`]}>
                <Route path="/animais/alterar/:id">
                    <AnimalCreate></AnimalCreate>
                </Route>
            </MemoryRouter>
        )
        const saveButton = container.querySelector("#saveButton")
        expect(saveButton).not.toBeNull()
        fireEvent.click(saveButton)
        expect(updateAnimal).toHaveBeenCalledTimes(1)
    })

    test('Se está pegando os dados de um animal e colocando no forms', ()=>{
        selectAnimalById.mockImplementation(()=>{
            return {id: 1, nome: "auau", tipo: "", dataNascimento:  new Date('2010-05-10'), peso: 10.0 }
        })
        const animalId = 1
        const history = createMemoryHistory();
        const {container} =render(
            <MemoryRouter initialEntries={[`/animais/alterar/${animalId}`]}>
                <Route path="/animais/alterar/:id">
                    <AnimalCreate></AnimalCreate>
                </Route>
            </MemoryRouter>
        )
        const saveButton = container.querySelector("#saveButton")
        expect(saveButton).not.toBeNull()
        fireEvent.click(saveButton)
        expect(selectAnimalById).toHaveBeenCalled()
        const nome = container.querySelector("#nome")
        expect(nome.value).toEqual('auau')
    })
 
})
