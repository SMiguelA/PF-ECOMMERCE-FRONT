import { useLocation, Outlet } from "react-router";
import { DivContainer } from "../../ComponentsStyles";
import Filters from "../../Components/Filters/Filters";
import Cards from "./Components/Cards";
export default function Store() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/store" && (
        <DivContainer>
          <Filters />
          <Cards />
        </DivContainer>
      )}
      <Outlet />
    </>
  );
}
