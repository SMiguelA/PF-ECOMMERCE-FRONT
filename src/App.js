import { useLocation } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./Components";
import RoutesMain from "./Routes/RoutesApp";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" && (
          <div className="Header">
            <Header />
          </div>
        )}
      {/* Main */}
      <div className="Main">
        <RoutesMain />
      </div>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" && (
          <div className="Footer">
            <Footer />
          </div>
        )}
    </div>
  );
}

export default App;
