import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Input, InputPeso, InputDataNascimento, Fieldset, Label, InputGroup, SelectTipo, SaveButton, CancelButton, Form, ButtonGroup, Button, Response, SuccessMsg} from "./animalCreate.styles";
import { Link } from "react-router-dom";
import { updateAnimal,postAnimal, setStatus, selectAnimalById } from "../../redux/slice/animal.slice";
import { ErrorMsg } from "../Animals/animals.style";
import { statusConsts } from "../../redux/slice/statusConsts";


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
    const [animal, setAnimal] = useState({nome: "", tipo: "cachorro", peso:0, dataNascimento: ''})
    const status = useSelector(state => state.animals.status)
    const dispatch = useDispatch()
    const location = useLocation()
    const {id}= useParams()
    const animalFound = useSelector(state => selectAnimalById(state, id))
   
    useEffect(()=>{
        dispatch(setStatus(statusConsts.EMPTY))
        if(animalFound){
            setAnimal(animalFound)      
        }  
    }, [])
    const handleChange = (e) =>{
        let {name, value} = e.target
        setAnimal({ ...animal, [name]: value})
      }

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
                <Link to="/animais" id="voltarLinkContainer"><Button id="voltarButton">Voltar</Button></Link>
                <Link to="/animais" id="cancelLinkContainer"><CancelButton id="cancelButton">Cancelar</CancelButton></Link>
                <SaveButton id="saveButton" onClick={(e)=>{
                    e.preventDefault()
                    if(!id)
                        dispatch(postAnimal(animal))
                    else{
                        dispatch(updateAnimal(animal))
                    }
                }}>Salvar</SaveButton>
            </ButtonGroup>

            <Response >
                {showMessage(status)}
            </Response>
        </Form>
    )
}