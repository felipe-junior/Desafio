import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAnimalById } from "../../redux/slice/animal.slice";
import { Excluir} from './animals.style'
export const LinhaTabelaAnimals = (props)=>{
    const dispatch = useDispatch()
    


    return (
        props.animals?.map(animal=>{
            return( <tr key={animal.id}>
                    <td>{animal.dataNascimento}</td>
                    <td>{animal.nome}</td>
                    <td>{animal.tipo}</td>
                    <td>{animal.peso} kg</td>
                    <td><Link id={`buttonUpdate${animal.id}`} to={{pathname: `/animais/alterar/${animal.id}`}}>Alterar</Link></td>
                    <td><Excluir id="buttonDelete" onClick={(e)=>{
                        e.preventDefault()
                        dispatch(deleteAnimalById(animal.id))

                    }}>Excluir</Excluir></td>
                </tr>
        )})
    )
}