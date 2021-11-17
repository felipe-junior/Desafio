import React, { useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { deleteAnimal, getAllAnimals } from "../../redux/actions/Animals/animals.action";

import { Link } from "react-router-dom";
import {Wrapper, Button, Table, ErrorMsg, Excluir} from './animals.style'

const formatDate = (date)=> {
    const cutDate = date.slice(0,10)
    return new Date(cutDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})
}
function Animals(){
    const dispatch = useDispatch()
    const animalsReducer = useSelector(state =>{
        return state.animalsReducer
    })
    
    const {loading, error} = animalsReducer
    
    useEffect(()=>{
        dispatch(getAllAnimals());
    }, [dispatch])

    return (
        <Wrapper>
           <Link to="/animais/criar"><Button>Criar animal</Button></Link>          
           <Table>
               <tbody>
                   <tr>
                       <th>Data de nascimento</th>
                       <th>Nome</th>
                       <th>Tipo</th>
                       <th>Peso</th>
                       <th>Alterar</th>
                       <th>Excluir</th>
                   </tr>

                  {animalsReducer.animals.map(animal=>{
                      return (
                          <tr key={animal.id}>
                              <td>{formatDate(animal.dataNascimento)}</td>
                              <td>{animal.nome}</td>
                              <td>{animal.tipo}</td>
                              <td>{animal.peso} kg</td>
                              <td><Link to={{pathname: "/animais/alterar",state:{animal}}}>Alterar</Link></td>
                              <td><Excluir onClick={(e)=>{
                                  e.preventDefault()
                                  dispatch(deleteAnimal({id: animal.id}))

                              }}>Excluir</Excluir></td>
                          </tr>
                      )
                    })}
               </tbody>
           </Table>
            {loading? <p>Loading...</p>:  undefined}
            {error? <ErrorMsg>Erro ao se conectar com o servidor, tente mais tarde</ErrorMsg>: undefined}
       </Wrapper>
    )
}

export default Animals