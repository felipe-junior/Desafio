import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import animalsReducer, { deleteAnimalById, selectAllAnimals } from '../redux/slice/animal.slice'
import { getAnimals, postAnimal, updateAnimal } from '../redux/slice/animal.slice'
import { httpGetAnimals, httpPostAnimal, httpUpdateAnimal, httpDeleteAnimal } from '../utils/requests'
import AnimalCreate from '../pages/AnimalCreate/animalCreate'
import { statusConsts } from '../redux/slice/statusConsts'
import Animals from '../pages/Animals/animals'

jest.mock('../utils/requests', () => ({
    httpGetAnimals: jest.fn(),
    httpPostAnimal: jest.fn(),
    httpUpdateAnimal: jest.fn(),
    httpDeleteAnimal: jest.fn()
}))


let store;
describe('Animals integration com Slice', () => {

    beforeEach(() => {
        store = configureStore({
            reducer: {
                animals: animalsReducer
            }
        })
    })
    beforeAll(()=>{
        httpPostAnimal.mockImplementation(() => Promise.resolve({ ...animal, id: 1 }))
    })
    afterEach(() => {
        httpGetAnimals.mockClear()
        httpPostAnimal.mockClear()
        httpDeleteAnimal.mockClear()
    })
    test('Se ao fazer uma requisição o array de animals é exibido na tela',async ()=>{
        const history = createMemoryHistory({ initialEntries: ["/"] });
        httpGetAnimals.mockImplementation(() => Promise.resolve([
            {
                id: 1,
                nome: "mockid1",
                tipo: "cachorro",
                dataNascimento: Date.now(),
                peso: 10.0
            }
        ]))
        const {container} =render(
            <Provider store={store}>
                <Router history={history}>
                  <Animals></Animals>
                </Router>
            </Provider>
        )

        await store.dispatch(getAnimals())
        expect(store.getState().animals.status).toBe(statusConsts.SUCCESS)
        expect(screen.getByText("mockid1")).toBeInTheDocument()
        
    })
})