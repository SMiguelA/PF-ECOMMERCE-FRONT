import "./App.css";
import { Footer, Navigation } from "./Components";
import RoutesMain from "./Routes/RoutesApp";


function App() {
  //traer user del estado (useSelector)

  return (
    <div className="App">
      <header>
        <Navigation />
      </header>

      <RoutesMain/>

      <Footer/>
    </div>
  );
}

export default App;
