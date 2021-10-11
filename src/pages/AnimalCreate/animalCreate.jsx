import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, InputPeso, InputDataNascimento, Fieldset, Label, InputGroup, SelectTipo, SaveButton, CancelButton, Form, ButtonGroup, Button} from "./animalCreate.styles";
import { Link } from "react-router-dom";
export default function AnimalCreate(){
    const dispatch = useDispatch()
    const [animal, setAnimal] = useState({nome: "", tipo: "", peso:0, dataNascimento:""})
    
    
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
                }}>Salvar</SaveButton>
            </ButtonGroup>
        </Form>
    )
}