import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import RoutesMain from "./Routes/RoutesApp";
function App() {
  //traer user del estado (useSelector)

  return (
    <div className="App">
      <header>

        <Navigation />
      </header>
        <RoutesMain/>
        <footer>
        </footer>
    </div>
  );
}

export default App;
