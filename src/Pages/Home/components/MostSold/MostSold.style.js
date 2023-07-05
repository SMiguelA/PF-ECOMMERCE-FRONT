// Third Party Dependencies.
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// LinkStyle.
export const StyledLink = styled(Link)`
  text-decoration: none;
`;

// MostSoldContainer.
export const MostSoldContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// MostSoldItem.
export const MostSoldItem = styled(StyledLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 400px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.stock === 0 &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

// MostSoldDetails.
export const MostSoldDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

// MostSoldName.
export const MostSoldName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin: 10px;
  text-align: center;
`;

// MostSoldText.
export const MostSoldText = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: #fff;
  margin: 10px;
  text-align: center;
`;
