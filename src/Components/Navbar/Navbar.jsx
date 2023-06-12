import { AiFillAppstore, AiFillFire } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { LuLogIn } from "react-icons/lu";
import { Nav, StyledLink } from "../../ComponentsStyles";
import styles from "./Navbar.module.css";

// import style from "./Header.module.css";

export default function Navbar() {
  return (
    <div className={styles.containerLink}>
      <div className={styles.firstchildLink}>
        <Nav>
          <ul className={styles.containerUl}>
            <StyledLink to="/" style={{ listStyle: "none" }}>
              <li>
                <HiHome size={25} style={{ marginBottom: "5px" }} /> Home
              </li>
            </StyledLink>
            <StyledLink to="/store">
              <li>
                <AiFillFire size={25} style={{ marginBottom: "5px" }} /> Store
              </li>
            </StyledLink>
            <StyledLink to="">
              <li>
                <AiFillAppstore size={25} style={{ marginBottom: "5px" }} />{" "}
                Favorites
              </li>
            </StyledLink>
            <StyledLink to="">
              <li>
                <CgShoppingCart size={25} style={{ marginBottom: "5px" }} />{" "}
                Cart
              </li>
            </StyledLink>
            <StyledLink to="">
              <li>
                <FaUserFriends size={25} style={{ marginBottom: "5px" }} />{" "}
                Friends
              </li>
            </StyledLink>{" "}
          </ul>
        </Nav>
      </div>
      <div className={styles.secondChildLink}>
        <ul style={{ listStyle: "none" }}>
          <StyledLink to="/login">
            <li>
              <LuLogIn size={25} style={{ marginBottom: "5px" }} /> Login
            </li>
          </StyledLink>
        </ul>
      </div>
    </div>
  );
}
