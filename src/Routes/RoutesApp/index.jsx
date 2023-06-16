import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "../../Components";
import TableAdmin from "../../Components/Table/TableAdmin";
import { Aside, Main } from "../../ComponentsStyles";
import Cart from "../../Pages/Cart/Cart";
import Detail from "../../Pages/Detail/Detail";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import NewProduct from "../../Pages/NewProduct/NewProduct";
import Orders from "../../Pages/Orders/Orders";
import Signup from "../../Pages/Signup/Signup";
import Store from "../../Pages/Store/Store";

function RoutesMain() {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
      }}
    >
      {location.pathname !== "/login" &&
        location.pathname !== "/register_user" && (
          <Aside>
            <Navbar />
          </Aside>
        )}

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
              <Route path="/logout" element={<Home />} />
              <Route path="/register_user" element={<Signup />} />
            </>
          )}

          {user && (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/logout" element={<Home />} />
            </>
          )}

          {user && user.isAdmin && (
            <>
              <Route path="/new-product" element={<NewProduct />} />
              <Route path="/admin" element={<TableAdmin />} />
            </>
          )}
        </Routes>
      </Main>
    </div>
  );
}

export default RoutesMain;
