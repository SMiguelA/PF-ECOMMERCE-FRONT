import Cards from "./components/Cards";
import style from "./Home.module.css";

export default function Home() {

  return (
    <div className={style.container} >

      <Cards />
    </div>
  );
}
