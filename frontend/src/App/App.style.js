import styled from "styled-components";

export const Header = styled.header`

`
export const NavWrapper = styled.nav`
    display: flex;
    justify-content: center;
    /* padding: 30px 20px 30px 20px; */
    align-items: center;
    background-color: grey;
    gap: 40px;
    a { 
        text-decoration: none;
        color: black;
        background-color: green;
        width: 70px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
    }
`