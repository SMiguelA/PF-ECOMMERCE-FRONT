import { Routes, Route } from 'react-router-dom';
import Home from "../../Pages/Home/Home";


function RoutesMain() {

  return (
    <main>
      <Routes>
        <Route path ="/" element ={<Home/>} />
      </Routes>
    </main>
  );
}

export default RoutesMain;
