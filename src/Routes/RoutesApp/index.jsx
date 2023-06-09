import { Routes, Route } from 'react-router-dom';
import Home from "../../Pages/Home/Home";
import Detail from '../../Pages/Detail/Detail';
import Store from '../../Pages/Store/Store';
function RoutesMain() {

  return (
    <main style={{display: "flex"}}>
      <Routes>
        <Route path ="/" element ={<Home/>} >
          <Route path ="store" element={<Store/>}>
            <Route path = "detail/:id" element = {<Detail/>}/>
          </Route>
        </Route>
          
      </Routes>
    </main>
  );
}

export default RoutesMain;
