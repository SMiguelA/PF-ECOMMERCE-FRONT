import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../Components";
import { Aside, Main } from "../../ComponentsStyles";
import Cart from "../../Pages/Cart/Cart";
import Detail from "../../Pages/Detail/Detail";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import Signup from "../../Pages/Signup/Signup";
import Store from "../../Pages/Store/Store";

function RoutesMain() {
  const user = useSelector((state) => state.user);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Aside>
        <Navbar />
      </Aside>
      <Main>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="store" element={<Store />}>
              <Route path="detail/:id" element={<Detail />} />
            </Route>
            <Route />
          </Route>

          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {user && (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
            </>
          )}
        </Routes>
      </Main>
    </div>
  );
}

export default RoutesMain;
