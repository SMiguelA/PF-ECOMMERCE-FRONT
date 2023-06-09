import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation , Outlet} from "react-router";
import { getProducts } from "../../Redux/Actions";
import { getUsers } from "../../Redux/Actions";
import { DivContainer } from "../../ComponentsStyles";

export default function Home() {
  const dispatch = useDispatch();
  const location = useLocation()
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
  }, []);

  return (
    <>
    {
      (location.pathname === "/" ) &&
      
      <DivContainer>
      
    </DivContainer>
    }

    <Outlet/>
    </>
    
  );
}
