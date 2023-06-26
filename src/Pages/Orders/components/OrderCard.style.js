import styled from "styled-components";

// Styles with Responsive Design.

export const OrderCardContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 1rem 2rem;
  margin: .8rem 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 85%;
  background-color: #373737;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 320px) {
    width: 100%;
  }
  
`;

export const StatusCircle = styled.div`
  background-color: ${(props) =>
    props.status === "succeeded" ? "#71CE98" : "#BB4747"};
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OrderDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin-left: 1rem;
    width: 100%;
`;


export const OrderDetails = styled.div`
  display: flex;

`;


export const DetailLabel = styled.h4`
    display: flex;
    align-items: center;
    margin:0;
    padding:0;
    margin-right: 1rem;
`;

export const DetailLabelValue = styled.h4`
    color: #71CE98;
    margin:0;
    margin-left: 0.5rem;
`;