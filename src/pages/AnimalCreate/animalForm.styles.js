import styled, {css} from "styled-components";

export const Form = styled.form`
    margin: 0 auto;

`
export const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    padding: 20px 0px 0px 35px;
    margin: 0 auto;
    margin-top: 30px;
    border: black 2px solid;
    width: 900px;
    border-radius: 4px;
    `

export const InputGroup = styled.div`
    width: 100%;
    
    `
const defaultStyledInput = css`
        border: 2px solid black;
        height: 35px;
        margin-bottom: 20px;
        text-indent: 5px;
    &:focus{
        outline: none;
        box-shadow: 0px 0px 3px 0px #4878e8;
    }
    `
    
export const Input = styled.input`
    width: 300px;
    ${defaultStyledInput}
    
    `
export const SelectTipo = styled.select`
    width: 300px;
    ${defaultStyledInput}
    &:hover{
        cursor: pointer;
    }
`

export const InputPeso = styled.input`
    width: 140px;
    ${defaultStyledInput}
    `
export const InputDataNascimento = styled.input`
    width: 140px;
    ${defaultStyledInput}
    `
export const Label = styled.label`
    display: inline-block;
    text-align: right;
    margin-right: 15px;
    width: 200px ;

`
export const ButtonGroup = styled.div`
    text-align: center;
    margin-top: 20px;
`

const buttonDefaultStyle = css`
    display: inline-block;
    height: 40px;
    border-radius: 4px;
    border: 0px solid #363636;
    &:hover{
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.2s;
        box-shadow: 0px 0px 5px 1px #808080;
    }
`
export const CancelButton = styled.button`
    margin-right: 20px;
    width: 120px;
    background-color: #ec5464 ;
    ${buttonDefaultStyle}
`
export const SaveButton = styled.button`
    width: 100px;
    background-color: #42d4a3;
    ${buttonDefaultStyle}
`