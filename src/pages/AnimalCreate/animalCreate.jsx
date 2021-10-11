import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, InputPeso, InputDataNascimento, Fieldset, Label, InputGroup, SelectTipo, SaveButton, CancelButton, Form, ButtonGroup, Button, Response, SuccessMsg} from "./animalCreate.styles";
import { Link } from "react-router-dom";
import { saveAnimal } from "../../redux/actions/Animals/animals.action";
import { ErrorMsg } from "../Animals/animals.style";


const showMessage = (status, loading, error)=>{
    
    if(loading===true)
        return <span>Salvando...</span>
    if(error)
        return <ErrorMsg>No momento o servidor encontra-se inoperante, tente novamente mais tarde</ErrorMsg>
    if(status >=200 && status <=300)
        return <SuccessMsg> Animal salvo com sucesso</SuccessMsg>
    if(status>=300 && status<200)
    return <ErrorMsg>Ocorreu um erro na solicitação, tente novamente</ErrorMsg> 
}
export default function AnimalCreate(){
    const [animal, setAnimal] = useState({nome: "", tipo: "", peso:0, dataNascimento:""})
    const response = useSelector(state => state.animalPostResponse.response)
    const loading= useSelector(state => state.animalPostResponse.loading)
    const error= useSelector(state => state.animalPostResponse.error)
    const dispatch = useDispatch()
    
    const handleChange = (e)=>setAnimal(prevState =>{
        return {...prevState, [e.target.name]:e.target.value}
    })    
    return (

        <Form action="">
            <Fieldset>
                <legend style={{marginTop: "-50px;"}}>Animal</legend>
                <InputGroup>
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                        value={animal.nome}
                        id="nome"
                        name="nome"
                        onChange={handleChange}>
                    </Input>
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="tipo" >Tipo</Label>
                    <SelectTipo onChange={handleChange} name="tipo">
                        <option value="cachorro">cachorro</option>
                        <option value="gato">gato</option>
                    </SelectTipo>
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="peso">Peso</Label>
                    <InputPeso
                        value={animal.peso}
                        id="peso"
                        name="peso"
                        onChange={handleChange}>
                    </InputPeso>
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="dataNasc">Data de Nascimento</Label>
                    <InputDataNascimento
                        value={animal.dataNascimento}
                        id="dataNasc"
                        name="dataNascimento"
                        onChange={handleChange}
                        type="date">
                    </InputDataNascimento>
                </InputGroup>
            </Fieldset>
            <ButtonGroup>
                <Link to="/animais"><Button>Voltar</Button></Link>
                <CancelButton onClick={(e)=>null}>Cancelar</CancelButton>
                <SaveButton onClick={(e)=>{
                    e.preventDefault()
                    dispatch(saveAnimal(animal))
                }}>Salvar</SaveButton>
            </ButtonGroup>

            <Response>
                {showMessage(response?.status, loading, error)}
            </Response>
        </Form>
    )
}