import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Router} from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { LinhaTabelaAnimals } from '../pages/Animals/ListagemAnimals'
import { Excluir } from '../pages/Animals/animals.style'
import { selectAllAnimals } from '../redux/slice/animal.slice'
import { Provider, useDispatch, useSelector } from 'react-redux'
import Animals from '../pages/Animals/animals'
import { statusConsts } from '../redux/slice/statusConsts'



jest.mock('react-redux', ()=>{
    return {
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn(),
        useDispatch: jest.fn()
        
    }
})
const mockState = {
    animals: {
        status: statusConsts.ERROR,
        entities: [
            {id:1, nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 },
            {id:2, nome: "totó", tipo: "", dataNascimento: Date.now(), peso: 10.0 }
        ],
    }
}

jest.mock('../redux/slice/animal.slice', ()=>{
    return {
        ...jest.requireActual('../redux/slice/animal.slice'),
        selectAllAnimals: jest.fn()
    }
})
jest.mock('../pages/Animals/ListagemAnimals', ()=> {
    return {
        ...jest.requireActual('../pages/Animals/ListagemAnimals'),
        LinhaTabelaAnimals: jest.fn()
    }
})

describe('Testando o componente animals isolado', ()=>{

    beforeEach(()=>{
        selectAllAnimals.mockImplementation(()=>{
            return mockState.animals.entities
        })
        useDispatch.mockImplementation(()=>jest.fn((param)=>{
            return param
        }))
        useSelector.mockImplementation(callback =>{
            return callback(mockState)
        })
        LinhaTabelaAnimals.mockImplementation(()=>{
    
            return (<tr key={1}>
                            <td>Mocked line</td>
                    </tr>
                )
        })
    })
    test('Se a mensagem de erro aparece', ()=>{
        const history = createMemoryHistory({ initialEntries: ["/"] });
        render(
                <Router history={history}>
                    <Animals></Animals>
                </Router>
        )
        expect(screen.getByText(/Algo de errado aconteceu/i))
    })
    test('Se a mensagem de carregando aparece', ()=>{
        const history = createMemoryHistory({ initialEntries: ["/"] });
        mockState.animals.status = statusConsts.LOADING
        render(
                <Router history={history}>
                    <Animals></Animals>
                </Router>
        )

        expect(screen.getByText(/Carregando/i))
    })

})