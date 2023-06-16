import { AiFillAppstore, AiFillFire } from "react-icons/ai";
import { CgList, CgShoppingCart } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { HiHome } from "react-icons/hi";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Nav, StyledLink } from "../../ComponentsStyles";
import styles from "./Navbar.module.css";

import { logoutUser } from "../../Redux/Actions";

export default function Navbar() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("entró al handleLogout");

    // Llama a la acción de Redux para cerrar sesión
    dispatch(logoutUser());

    console.log("hizo dispatch de logout usr");

    // Borra el usuario del localStorage
    localStorage.removeItem("user");

    // Redirige al usuario a la página de inicio
    navigate("/logout");
  };

  return (
    <div className={styles.containerLink}>
      <div className={styles.firstchildLink}>
        <Nav>
          <ul className={styles.containerUl}>
            <StyledLink to="/" style={{ listStyle: "none" }}>
              <li>
                <HiHome
                  size={25}
                  style={{ marginBottom: "5px" }}
                  className={styles.iconsNav}
                />{" "}
                Home
              </li>
            </StyledLink>
            <StyledLink to="/store">
              <li>
                <AiFillFire
                  size={25}
                  style={{ marginBottom: "5px" }}
                  className={styles.iconsNav}
                />{" "}
                Store
              </li>
            </StyledLink>
            <StyledLink to="">
              <li>
                <AiFillAppstore
                  size={25}
                  style={{ marginBottom: "5px" }}
                  className={styles.iconsNav}
                />{" "}
                Favorites
              </li>
            </StyledLink>
            <StyledLink to="/cart">
              <li>
                <CgShoppingCart
                  size={25}
                  style={{ marginBottom: "5px" }}
                  className={styles.iconsNav}
                />{" "}
                Cart
              </li>
            </StyledLink>
            <StyledLink to="">
              <li>
                <FaUserFriends
                  size={25}
                  style={{ marginBottom: "5px" }}
                  className={styles.iconsNav}
                />{" "}
                Friends
              </li>
            </StyledLink>{" "}
          </ul>
        </Nav>
      </div>

      {!user && (
        <div className={styles.secondChildLink}>
          <ul style={{ listStyle: "none" }}>
            <StyledLink to="/login">
              <li>
                <LuLogIn size={25} style={{ marginBottom: "5px" }} /> Login
              </li>
            </StyledLink>
          </ul>
        </div>
      )}

      {user && (
        <div className={styles.secondChildLink}>
          <ul style={{ listStyle: "none" }}>
            {user.isAdmin && (
              <>
                <StyledLink to="/admin">
                  <li>
                    <GrUserAdmin size={25} style={{ marginBottom: "5px" }} />{" "}
                    Admin
                  </li>
                </StyledLink>
                <StyledLink to="/new-product">
                  <li>
                    <MdCreateNewFolder
                      size={25}
                      style={{ marginBottom: "5px" }}
                      className={styles.iconsNav}
                    />{" "}
                    New Products
                  </li>
                </StyledLink>
              </>
            )}
            <StyledLink to="/orders">
              <li>
                <CgList
                  size={25}
                  style={{ marginBottom: "5px" }}
                  className={styles.iconsNav}
                />{" "}
                Orders
              </li>
            </StyledLink>{" "}
            <StyledLink to="/">
              <li>
                <span onClick={handleLogout}>
                  <LuLogOut
                    size={25}
                    style={{ marginBottom: "5px" }}
                    className={styles.iconsNav}
                  />{" "}
                  LogoutTTT
                </span>
              </li>
            </StyledLink>
          </ul>
        </div>
      )}
    </div>
  );
}
