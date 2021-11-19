import '@testing-library/jest-dom'
import {configureStore} from '@reduxjs/toolkit'
import {getAnimals, postAnimal, statusConsts, updateAnimal} from  '../../redux/slice/animal.slice'
import animalsReducer from '../../redux/slice/animal.slice'
import { render, screen } from '@testing-library/react'
import {httpGetAnimals, httpPostAnimal, httpUpdateAnimal, httpDeleteAnimal} from '../../utils/requests'
import Animals from './animals'
import {createMemoryHistory} from 'history'
import { Provider } from 'react-redux'
    import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom'
import { Wrapper } from './animals.style'
import AnimalCreate from '../AnimalCreate/animalCreate'
import userEvent from '@testing-library/user-event'

jest.mock('../../utils/requests', ()=>({
    httpGetAnimals: jest.fn(),
    httpPostAnimal: jest.fn(),
    httpUpdateAnimal: jest.fn(),
    httpDeleteAnimal: jest.fn()
}))



let store;
describe('Animals slice',  ()=>{

    beforeEach(()=>{
        store = configureStore({
            reducer:{
                animals: animalsReducer
            }
        })
    })
    afterEach(()=>{
        httpGetAnimals.mockClear()
    })

    test('if dispatch getAnimals is fullfiled', async ()=>{
        httpGetAnimals.mockImplementation(()=>Promise.resolve([
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

    test('if dispatch getAnimals is pending', async ()=>{
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        httpGetAnimals.mockImplementation(()=>{
            return wait(2000)
        })
        
         store.dispatch(getAnimals())
         expect(store.getState().animals.status).toBe(statusConsts.LOADING)
            
    })
    test('if dispatch getAnimals was rejected', async ()=>{
        httpGetAnimals.mockImplementation(()=>Promise.reject({}))
        await store.dispatch(getAnimals())
        expect(store.getState().animals.status).toBe(statusConsts.ERROR)     
    })

    
    test('if dispatch postAnimal is fullfiled', async ()=>{
        const animal = {
            nome: "totó",
            tipo: "cachorro",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        httpPostAnimal.mockImplementation(()=>Promise.resolve({...animal, id:1}))
        await store.dispatch(postAnimal(animal))
        expect(store.getState().animals.status).toEqual(statusConsts.SUCCESS)
        expect(store.getState().animals.entities["1"]).toEqual({...animal, id: 1})
    })
    test('if dispatch postAnimal was rejected', async ()=>{
        const animal = {
            nome: "totó",
            tipo: "cachorro",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        httpPostAnimal.mockImplementation(()=>{
            return Promise.reject({})
        })
        await store.dispatch(postAnimal(animal))
        expect(store.getState().animals.status).toEqual(statusConsts.ERROR)
    })
    test('if dispatch postAnimal was rejected and ErrorMsg is visible', async ()=>{
        const history = createMemoryHistory({ initialEntries: ["/"] });
        const animal = {
            nome: "totó",
            tipo: "cachorro",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        httpPostAnimal.mockImplementation(()=>{
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

    test('if dispatch update is fullfiled', async ()=>{
        const updatedAnimal = {
            id: 1,
            nome: "totó",
            tipo: "",
            dataNascimento: Date.now(),
            peso: 10.0
        }
        httpUpdateAnimal.mockImplementation(()=>Promise.resolve(updatedAnimal))
        await store.dispatch(updateAnimal(1))
        expect(store.getState().animals.status).toEqual(statusConsts.SUCCESS)
        expect(store.getState().animals.entities["1"]).toEqual({...updatedAnimal, id: 1})
    })

    test('if dispatch update is loading', async ()=>{
        const history = createMemoryHistory({ initialEntries: ["/"] });
        const updatedAnimal = {
            id: 1,
            nome: "totó",
            tipo: "",
            dataNascimento: Date.now(),
            peso: 10.0
        }      
        
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        httpUpdateAnimal.mockImplementation(()=> wait(3000))
        store.dispatch(updateAnimal(1))
        expect(store.getState().animals.status).toEqual(statusConsts.LOADING)
    })
    test('if dispatch update is failed', async ()=>{
        //todo
    })
})
