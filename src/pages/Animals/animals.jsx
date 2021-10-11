import React, { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { getAllAnimals } from "../../redux/actions/Animals/animals.action";
import { GET_ANIMAL_ID_SUCCESS } from "../../redux/actions/types";

import { Link } from "react-router-dom";
import {Wrapper, Button, Table, ErrorMsg} from './animals.style'

function Animals(){
    const dispatch = useDispatch()
    const animals = useSelector(state =>{
        return state.animals
    })
    const {loading, error} = animals
    console.log( error)
    
    useEffect(()=>{
        dispatch(getAllAnimals());
    }, [])

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

                  {animals.animals.map(animal=>{
                      return (
                          <tr key={animal.id}>
                              <td>{animal.dataNascimento}</td>
                              <td>{animal.nome}</td>
                              <td>{animal.tipo}</td>
                              <td>{animal.peso}</td>
                              <td><a href="http://">Alterar</a></td>
                              <td><a href="">Excluir</a></td>
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