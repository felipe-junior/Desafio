import React, { useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";

import { Link } from "react-router-dom";
import {Wrapper, Button, Table, ErrorMsg, Excluir} from './animals.style'
import { getAnimals, deleteAnimalById, selectAllAnimals} from "../../redux/slice/animal.slice";
import { LinhaTabelaAnimals } from "./ListagemAnimals";
import { statusConsts } from "../../redux/slice/statusConsts";

export default function Animals(){
    const dispatch = useDispatch()
    const animals = useSelector(selectAllAnimals)
    const status = useSelector(state => state.animals.status)
    useEffect(()=>{
      dispatch(getAnimals())
    }, [])
    useEffect(()=>{
    }, [animals])
    useEffect(()=>{

    }, [status])

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
                   <LinhaTabelaAnimals animals={animals}></LinhaTabelaAnimals>
    
               </tbody>
           </Table>
            {status===statusConsts.LOADING? <p>Carregando...</p>:  undefined}
            {status===statusConsts.ERROR? <ErrorMsg>Algo de errado aconteceu</ErrorMsg>: undefined}
       </Wrapper>
    )
}

