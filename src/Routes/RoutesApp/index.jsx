import { Routes, Route } from 'react-router-dom';
import Home from "../../Pages/Home/Home";
import Detail from '../../Pages/Detail/Detail';
import Store from '../../Pages/Store/Store';
import { Navbar} from '../../Components';
import { Aside, Main } from '../../ComponentsStyles';
function RoutesMain() {

  return (
    <div style={{display: "flex", flexDirection:"row"}}>
    <Aside >
        <Navbar/>
      </Aside>
    <Main>
      <Routes>
        <Route path ="/" element ={<Home/>} >
          <Route path ="store" element={<Store/>}>
            <Route path = "detail/:id" element = {<Detail/>}/>
          </Route>
        </Route>
          
      </Routes>
    </Main>
    </div>
  );
}

export default RoutesMain;
