import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'

import animalsReducer, { deleteAnimalById } from '../../redux/slice/animal.slice'
import { getAnimals, postAnimal, statusConsts, updateAnimal } from '../../redux/slice/animal.slice'
import { httpGetAnimals, httpPostAnimal, httpUpdateAnimal, httpDeleteAnimal } from '../../utils/requests'
import Animals from './animals'
import AnimalCreate from '../AnimalCreate/animalCreate'

jest.mock('../../utils/requests', () => ({
    httpGetAnimals: jest.fn(),
    httpPostAnimal: jest.fn(),
    httpUpdateAnimal: jest.fn(),
    httpDeleteAnimal: jest.fn()
}))



let store;
describe('Animals slice', () => {

    beforeEach(() => {
        store = configureStore({
            reducer: {
                animals: animalsReducer
            }
        })
    })
    afterEach(() => {
        httpGetAnimals.mockClear()
        httpPostAnimal.mockClear()
        httpDeleteAnimal.mockClear()
    })

    test('if dispatch getAnimals is fullfiled', async () => {
        httpGetAnimals.mockImplementation(() => Promise.resolve([
            {
                id: 1,
                nome: "totó",
                tipo: "cachorro",
                dataNascimento: Date.now(),
                peso: 10.0
            }
        ]))

        await store.dispatch(getAnimals())
        expect(store.getState().animals.status).toBe(statusConsts.SUCCESS)

    })

    test('if dispatch getAnimals is pending', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        httpGetAnimals.mockImplementation(() => {
            return wait(2000)
        })

        store.dispatch(getAnimals())
        expect(store.getState().animals.status).toBe(statusConsts.LOADING)

    })
    test('if dispatch getAnimals was rejected', async () => {
        httpGetAnimals.mockImplementation(() => Promise.reject({}))
        await store.dispatch(getAnimals())
        expect(store.getState().animals.status).toBe(statusConsts.ERROR)
    })


    test('if dispatch postAnimal is fullfiled', async () => {
        const animal = {
            nome: "totó",
            tipo: "cachorro",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        httpPostAnimal.mockImplementation(() => Promise.resolve({ ...animal, id: 1 }))
        await store.dispatch(postAnimal(animal))
        expect(store.getState().animals.status).toEqual(statusConsts.SUCCESS)
        expect(store.getState().animals.entities["1"]).toEqual({ ...animal, id: 1 })
    })
    test('if dispatch postAnimal was rejected', async () => {
        const animal = {
            nome: "totó",
            tipo: "cachorro",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        httpPostAnimal.mockImplementation(() => {
            return Promise.reject({})
        })
        await store.dispatch(postAnimal(animal))
        expect(store.getState().animals.status).toEqual(statusConsts.ERROR)
    })
    test('if dispatch postAnimal was rejected and ErrorMsg is visible', async () => {
        const history = createMemoryHistory({ initialEntries: ["/"] });
        const animal = {
            nome: "totó",
            tipo: "cachorro",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        httpPostAnimal.mockImplementation(() => {
            return Promise.reject({})
        })

        const animalCreate = render(
            <Provider store={store}>
                <Router history={history}>
                    <AnimalCreate></AnimalCreate>
                </Router>
            </Provider>
        )
        await store.dispatch(postAnimal(animal))
        //userEvent.click({})

        expect(screen.queryByText(/Erro ao salvar os dados/i)).not.toBeNull()
    })

    test('if dispatch update is fullfiled', async () => {
        const updatedAnimal = {
            id: 1,
            nome: "totó",
            tipo: "",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        httpUpdateAnimal.mockImplementation(() => Promise.resolve(updatedAnimal))
        await store.dispatch(updateAnimal(updateAnimal))
        expect(store.getState().animals.status).toEqual(statusConsts.SUCCESS)
        expect(store.getState().animals.entities["1"]).toEqual({ ...updatedAnimal, id: 1 })
    })

    test('if dispatch update is loading', async () => {
        const history = createMemoryHistory({ initialEntries: ["/"] });
        const updatedAnimal = {
            id: 1,
            nome: "totó",
            tipo: "",
            dataNascimento: Date.now(),
            peso: 10.0
        }

        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        httpUpdateAnimal.mockImplementation(() => wait(3000))
        store.dispatch(updateAnimal(updatedAnimal))
        expect(store.getState().animals.status).toEqual(statusConsts.LOADING)
    })
    test('if dispatch update is failed and change status to ERROR', async () => {
        const updatedAnimal = { id: 1, nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 }
        httpUpdateAnimal.mockImplementation(() => Promise.reject("Test ERROR"))
        await store.dispatch(updateAnimal(updatedAnimal))
        expect(store.getState().animals.status).toEqual(statusConsts.ERROR)
    })

    test('if dispatch update is failed and change status to ERROR and ErrorMsg is visible', async () => {
        const history = createMemoryHistory({ initialEntries: ["/"] });
        const updatedAnimal = { id: 1, nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 }

        httpUpdateAnimal.mockImplementation(() => Promise.reject({}))

        render(
            <Provider store={store}>
                <Router history={history}>
                    <AnimalCreate></AnimalCreate>
                </Router>
            </Provider>
        )
        await store.dispatch(updateAnimal(updatedAnimal))

        //userEvent.click({})
        expect(screen.queryByText(/Erro ao salvar os dados/i)).not.toBeNull()
        expect(store.getState().animals.status).toEqual(statusConsts.ERROR)
    })
    test('if dispatch delete is fullfiled', async () => {
        const newAnimal = { nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 }
        const id = 1
        //Inserindo animal no store
        httpPostAnimal.mockImplementation(() => Promise.resolve({ ...newAnimal, id: id }))
        await store.dispatch(postAnimal(newAnimal))
        expect(store.getState().animals.status).toEqual(statusConsts.SUCCESS)
        expect(store.getState().animals.entities["1"]).toEqual({ ...newAnimal, id: id })


        //Deletando animal no store

        httpDeleteAnimal.mockImplementation(() => Promise.resolve())
        await store.dispatch(deleteAnimalById(id))
        expect(store.getState().animals.status).toEqual(statusConsts.SUCCESS)
        expect(store.getState().animals.entities["1"]).toEqual(undefined)
    })

    test('if dispatch delete is pending', async ()=>{
        const newAnimal = { nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 }
        const id = 1
        //Inserindo animal no store
        httpPostAnimal.mockImplementation(() => Promise.resolve({ ...newAnimal, id: id }))
        await store.dispatch(postAnimal(newAnimal))
        expect(store.getState().animals.status).toEqual(statusConsts.SUCCESS)
        expect(store.getState().animals.entities["1"]).toEqual({ ...newAnimal, id: id })


        //Deletando animal no store
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        httpDeleteAnimal.mockImplementation(() => wait(2000))
        store.dispatch(deleteAnimalById(id))
        expect(store.getState().animals.status).toEqual(statusConsts.LOADING)
    })

    /*
    
    test('if dispatch delete is failed', async ()=>{
        const newAnimal = { nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 }
        const id = 1
        //Inserindo animal no store
        httpDeleteAnimal.mockImplementation(() => Promise.reject());
        httpPostAnimal.mockImplementation(() => Promise.resolve({ ...newAnimal, id: id }))
        await store.dispatch(postAnimal(newAnimal))
        expect(store.getState().animals.status).toEqual(statusConsts.SUCCESS)
        expect(store.getState().animals.entities["1"]).toEqual({ ...newAnimal, id: id })
        
        
        //Deletando animal no store
        await store.dispatch(deleteAnimalById(id))
        expect(store.getState().animals.status).toEqual(statusConsts.ERROR)
    })
    */
})
