import { useLocation } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./Components";
import RoutesMain from "./Routes/RoutesApp";


function App() {
  const location = useLocation()

  return (
    <div className="App">
      {
        (location.pathname !== "/login" && location.pathname !== "/register_user" )
        && <Header/>
      }
      {/* Main */}
      <RoutesMain/>
      {
        (location.pathname !== "/login" && location.pathname !== "/register_user" ) 
        &&  <Footer/>
      }
     
    </div>
  );
}

export default App;
