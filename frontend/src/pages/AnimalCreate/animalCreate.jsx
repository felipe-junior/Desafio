import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Input, InputPeso, InputDataNascimento, Fieldset, Label, InputGroup, SelectTipo, SaveButton, CancelButton, Form, ButtonGroup, Button, Response, SuccessMsg} from "./animalCreate.styles";
import { Link } from "react-router-dom";
import { saveAnimal, updateAnimal } from "../../redux/actions/Animals/animals.action";
import { ErrorMsg } from "../Animals/animals.style";



const showMessage = (status, loading, error)=>{
    if(status >=200 && status <=300)
        return <SuccessMsg> Animal salvo com sucesso</SuccessMsg>
    if(loading===true)
        return <span>Salvando...</span>
    if(error){
        if(status===400)
            return <ErrorMsg>Preencha todos os campos corretamente</ErrorMsg> 
        return <ErrorMsg>Erro interno</ErrorMsg>
    }
    return undefined
}


export default function AnimalCreate(props){
    const [animal, setAnimal] = useState({nome: "", tipo: "cachorro", peso:0, dataNascimento:""})
    const response = useSelector(state => state.animals.response)
    const loading= useSelector(state => state.animals.loading)
    const error= useSelector(state => state.animals.error)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(()=>{
        if(location.state){
            const update = location.state.animal
            setAnimal(update)
        }  
    }, [location.state])
   
    
    const handleChange = (e)=>setAnimal(prevState =>{
        return {...prevState, [e.target.name]:e.target.value}
    })

    return (

        <Form action="">
            <Fieldset>
                <legend >Animal</legend>
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
                    <SelectTipo onChange={handleChange} value="cachorro"name="tipo">
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
                <Link to="/animais"><CancelButton>Cancelar</CancelButton></Link>
                <SaveButton onClick={(e)=>{
                    e.preventDefault()
                    if(!location.state)
                        dispatch(saveAnimal(animal))
                    else{
                        dispatch(updateAnimal(animal))
                    }
                    setTimeout(()=>{}, 3000)
                }}>Salvar</SaveButton>
            </ButtonGroup>

            <Response {...response}>
                {showMessage(response?.status, loading, error)}
            </Response>
        </Form>
    )
}