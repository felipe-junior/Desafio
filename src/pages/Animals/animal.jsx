import React, { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";

import {Wrapper, Button, Table} from './animal.style'

function Animal(){
    const dispatch = useDispatch()
    

    return (
        <Wrapper>
           <Button>Novo animal</Button>
           <Table>
               <tbody>
                   <tr>
                       <th>Data de nascimePnto</th>
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
       </Wrapper>
    )
}

export default Animal 