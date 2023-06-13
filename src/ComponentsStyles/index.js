import { Link } from "react-router-dom";
import styled from "styled-components";



export const DivForm = styled.div`
display: flex;
background-color: rgba(17, 24, 39, 1);
border-radius: 0.75rem;
color: rgba(243, 244, 246, 1);
width: 28%;
height:58%;
flex-direction: column;
align-items:center;
justify-content:center;

`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
export const DivContainer = styled.div`
background-color: #151515;
display: flex;
justify-content: center;
align-items:center;
flex-direction: column;
height:120vh;
width:100%;
`;
export const DivContainerForm = styled.div`
background-color: #151515;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
height:60rem;
width:100%;
`;

export const ImgSlide = styled.img`
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: cover;
  border-radius: 10px;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 0.5s;
`;

export const Nav = styled.nav`
  display: flex;
  height: 20rem;
  width: 100%;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  color: white;
`;
// border:3px solid orange;

export const Aside = styled.aside`
display: flex;
height: 100%;
width: 15%;
flex-direction: column;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: center;
justify-content: center;
color: white;
position: fixed;
left: 0;
`;
// border:3px solid yellow;
export const Main = styled.main`
  display: flex;
  height: 70%;
  width: 85%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
