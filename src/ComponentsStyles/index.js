import { Link } from "react-router-dom";
import styled from "styled-components";



export const DivForm = styled.div`
display: flex;
background-color: rgba(17, 24, 39, 1);
border-radius: 0.75rem;
color: rgba(243, 244, 246, 1);
width: 25%;
height:55%;
flex-direction: column;
align-items:center;
justify-content:center;

`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
export const DivContainer = styled.div`
  background-color: rgb(21, 21, 21);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 5em;
`;
export const DivContainerForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: 1px solid red;
  height: 100%;
  width: 75%;
  margin-top: 3%;
  border-radius: 0.7em;
  background-image: url('../img/default.jpg');
  background-size: cover;
  /* background-color: rgba(0, 0, 0, 0.5); */
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
margin-top: 5em;
top: 5em;
display: flex;
height: 100%;
width: 15%;
font-weight: 700;
flex-direction: column;
-webkit-box-align: center;
align-items: center;
-webkit-box-pack: center;
justify-content: center;
color: white;
position: sticky;
left: 0;
`;
// border:3px solid yellow;
export const Main = styled.main`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  color: white;
`;
