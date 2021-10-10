import styled from 'styled-components'

export const Wrapper = styled.div`
   
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 80px;
`
export const Button = styled.button`
    width: 120px;
    padding: 10px 0 10px 0;
    background-color: #1b93a7;
    /* border: 1px solid; */
    border: 2px solid;
    box-shadow: 2px 2px 1px 1px;
    border-radius: 3px;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 30px;

    &:hover{
        cursor: pointer;
        transform: scale(1.05);
        transition: 0.2s;
    }
`
export const Table = styled.table`
    border: 2px solid;
    border-collapse: collapse;
    border-radius: 20px;
    width: 100%;

    .data-nascimento{
        width: 35%;
    }
    th, td{    
        border-right: 2px solid;
        border-left: 2px solid;
        text-align: start;
    }
    th{ 
        background-color: #c4c4c4;
        padding: 4px 4px 4px 5px;
    }
    td{
        padding: 10px;
        padding-left: 5px;
        
    }

    tr:nth-child(even) {
            background-color: #dedede;
           
    }
    tr::nth-child(odd){
            background-color: #FFFFFF;
        }
`

