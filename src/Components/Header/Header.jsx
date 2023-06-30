import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledLink } from "../../ComponentsStyles";
import { SearchBar } from "../searchBar/SearchBar";
import style from "./Header.module.css";


export default function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const handleLogout = (e) => {
  //   dispatch(logout());
  // };

  // const [isHovered, setIsHovered] = useState(false);

  // const handleHover = () => {
  //   setIsHovered(!isHovered);

  return (
    <div className={style.container}>
      <div className={style.leftItem}>
        <StyledLink to="/" className={style.noLinea}>
          <h1>Pixel Port</h1>
        </StyledLink>
      </div>
      <div className={style.rightItem}> 
        <SearchBar />
      </div>
    </div>
  );
}
