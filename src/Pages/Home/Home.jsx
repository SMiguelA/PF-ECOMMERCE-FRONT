import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation , Outlet} from "react-router";
import { getProducts } from "../../Redux/Actions";
import { getUsers } from "../../Redux/Actions";
import { DivContainer } from "../../ComponentsStyles";
import styles from "./Home.module.css"
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
      <div className={styles.containerLink}>

      </div>
      <div className={styles.containerHome}>
         <div className={styles.containerSlide}>

         </div>
         <div className={styles.containerCardsCategory}>

         </div>
      </div>
    </DivContainer>
    }

    <Outlet/>
    </>
    
  );
}
