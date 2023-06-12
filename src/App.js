import "./App.css";
import { Footer, Header } from "./Components";
import RoutesMain from "./Routes/RoutesApp";


function App() {
  //traer user del estado (useSelector)

  return (
    <div className="App">
      <Header/>
      {/* Main */}
      <RoutesMain/>
      <Footer/>
    </div>
  );
}

export default App;
