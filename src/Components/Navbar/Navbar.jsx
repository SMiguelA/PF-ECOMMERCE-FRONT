import { AiFillAppstore, AiFillFire } from "react-icons/ai";
import { CgList, CgProfile, CgShoppingCart } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { HiHome } from "react-icons/hi";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Nav, StyledLink } from "../../ComponentsStyles";
import styles from "./Navbar.module.css";

import { useState } from "react";
import { logoutUser } from "../../Redux/Actions";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const [userLogin, setUserLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Llama a la acción de Redux para cerrar sesión
    dispatch(logoutUser());
    // Borra el usuario del localStorage
    localStorage.removeItem("user");
    // Redirige al usuario a la página de inicio
    navigate("/");
  };

  const handleMenuUser = () => {
    if (userLogin) {
      setUserLogin(false);
    } else {
      setUserLogin(true);
    }
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
                {user && user.cart.count !== 0 && (
                  <div className={styles.containerCount}>{user.cart.count}</div>
                )}
              </li>
            </StyledLink>
            <StyledLink to="/messenger">
              <li>
                <FaUserFriends
                  size={25}
                  style={{ marginBottom: "5px" }}
                  className={styles.iconsNav}
                />{" "}
                Messenger
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
          <div className={styles.containerPerfiluser}>
            <div onClick={handleMenuUser} className={styles.menuUser}>
              {user.image !== undefined ? (
                <img src={user.image} alt="PerfilLogo" />
              ) : (
                <p>{user.name[0]}</p>
              )}
            </div>
          </div>

          <div className={styles.containerUser}>
            {userLogin && (
              <div className={styles.OpenMenuUser}>
                <ul style={{ listStyle: "none" }}>
                  {user.isAdmin && (
                    <>
                      <StyledLink to="/admin">
                        <li>
                          <GrUserAdmin
                            size={25}
                            style={{ marginBottom: "5px" }}
                          />{" "}
                          Dashboard
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
                      <StyledLink to="/orders-admin">
                        <li>
                          <CgList
                            size={25}
                            style={{ marginBottom: "5px" }}
                            className={styles.iconsNav}
                          />{" "}
                          Orders ADMIN
                        </li>
                      </StyledLink>{" "}
                    </>
                  )}
                  <StyledLink to="/orders">
                    <li>
                      <CgList
                        size={25}
                        style={{ marginBottom: "5px" }}
                        className={styles.iconsNav}
                      />{" "}
                      Orders User
                    </li>
                  </StyledLink>{" "}
                  <StyledLink to="/profile">
                    <li>
                      <CgProfile
                        size={25}
                        style={{ marginBottom: "5px" }}
                        className={styles.iconsNav}
                      />{" "}
                      Profile
                    </li>
                  </StyledLink>{" "}
                  <StyledLink to="/">
                    <li onClick={handleLogout}>
                      <LuLogOut
                        size={25}
                        style={{ marginBottom: "5px" }}
                        className={styles.iconsNav}
                      />
                      Logout
                    </li>
                  </StyledLink>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
