import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
text-decoration:none;
color:white;
`
export const DivContainer = styled.div`
  background-color: #151515;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 92%;
`;

export const ImgSlide = styled.img`
width: 100%;
height: 100%;
margin: 0;
object-fit: cover;
border-radius:10px;
opacity: ${props => (props.loaded ? 1 : 0)};
transition: opacity 0.5s;
`;

export const Nav =styled.nav`
display:flex;
height:20rem;
width:100%;
flex-direction:column;
align-items:center;
justify-content:center;
color: white;
`