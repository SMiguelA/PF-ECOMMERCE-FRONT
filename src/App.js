import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Pages/Home/Home";
import GameDetailPage from "./Pages/DetailPage/GameDetailPage";
import ComponentDetailPage from "./Pages/DetailPage/ComponentDetailPage";

function App() {
  //traer user del estado (useSelector)
  const user = true;

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />

          <Route path="*" element={<Home />} />
          <Route path="/games/:gameName" element={<GameDetailPage />} />
          <Route path="/components/:componentName" element={<ComponentDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
