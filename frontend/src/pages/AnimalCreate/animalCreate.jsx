import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Input, InputPeso, InputDataNascimento, Fieldset, Label, InputGroup, SelectTipo, SaveButton, CancelButton, Form, ButtonGroup, Button, Response, SuccessMsg} from "./animalCreate.styles";
import { Link } from "react-router-dom";
import { updateAnimal,postAnimal, statusConsts, setStatus } from "../../redux/slice/animal.slice";
import { ErrorMsg } from "../Animals/animals.style";



const showMessage = (status)=>{
    
    if(status===statusConsts.LOADING)
        return <span>Salvando...</span>
    if(status===statusConsts.ERROR)
        return <ErrorMsg>Erro ao salvar os dados.</ErrorMsg> 
    if(status === statusConsts.SUCCESS)
        return <SuccessMsg> Animal salvo com sucesso</SuccessMsg>
    
        return undefined
    
}


export default function AnimalCreate(props){
    const [animal, setAnimal] = useState({nome: "", tipo: "cachorro", peso:0, dataNascimento:""})
    const status = useSelector(state => state.animals.status)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(()=>{
        if(location.state){
            const updatedAnimal = location.state.animal
            setAnimal(updatedAnimal)
        }  
    }, [location.state])
   
    useEffect(()=>{
        dispatch(setStatus(statusConsts.EMPTY))
    }, [])
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
                        dispatch(postAnimal(animal))
                    else{
                        console.log(animal)
                        dispatch(updateAnimal(animal))
                    }
                    setTimeout(()=>{}, 3000)
                }}>Salvar</SaveButton>
            </ButtonGroup>

            <Response >
                {showMessage(status)}
            </Response>
        </Form>
    )
}