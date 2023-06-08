import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Filters from "../../Components/Filters/Filters";
import { getProducts } from "../../redux/Actions/Products/index";
import { getUsers } from "../../redux/Actions/Users/index";
import Cards from "./components/Cards";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
  }, []);

  return (
    <div className={style.container}>
      <Filters />
      <Cards />
    </div>
  );
}
