import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import types from '../../redux/actions/types'
import Animals from '../Animals/animals'
import storeMock from '../../redux/store'
import animalsReducer from '../../redux/reducers/Animal/animals.reducer'

describe('Teste no componente animais', ()=>{
    test('Se a mensagem carregando está aparecendo', ()=>{
        render(
            <Provider store={storeMock}>
                <BrowserRouter>
                    <Animals></Animals>
                </BrowserRouter>
            </Provider>
        )
        expect(screen.queryByText(/Loading/)).not.toBeNull()
    })
})

describe('Teste no animalsReducer', ()=>{
    it('deveria retornar o estado inicial igual o `expectedState`', ()=>{
        const expectedState = {
            animals: [],
            loading: false,
            error: false,
            response: {}
        }
        expect(animalsReducer(undefined, {})).toEqual(expectedState)
    })
})