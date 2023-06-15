import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { DivContainer } from "../../ComponentsStyles";
import { BodyView } from "../../Components";
export default function Store() {
  
  const location = useLocation();

  return (
    <>
      {location.pathname === "/store" && (
        <DivContainer>
              <BodyView/>
        </DivContainer>
      )}
      <Outlet />
    </>
  );
}
