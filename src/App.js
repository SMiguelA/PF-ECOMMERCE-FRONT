import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Footer from "./Pages/Home/components/Footer";
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
