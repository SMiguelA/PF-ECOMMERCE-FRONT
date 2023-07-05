import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { DivContainer } from "../../ComponentsStyles";
import { getProducts, getUsers } from "../../Redux/Actions";
import styles from "./Home.module.css";
import Slide from "./components/Slide/Slides";
import MostSold from "./components/MostSold/MostSold";

export default function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
  }, []);

  return (
    <>
      {location.pathname === "/" && (
        <DivContainer>
          <div className={styles.containerHome}>
            <div className={styles.containerSlide}>
              <Slide />
            </div>
          </div>
            <MostSold />
        </DivContainer>
      )}

      <Outlet />
    </>
  );
}
