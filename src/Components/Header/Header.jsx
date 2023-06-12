
import React from "react";
import {StyledLink} from "../../ComponentsStyles"
import style from "./Header.module.css";


export default function Header() {

    return (
      <div className={style.container}>
        <div className={style.leftItem}>
          <StyledLink to="/" className={style.noLinea}>
            <h1>E-Commerce</h1>
          </StyledLink>
        </div>
      </div>
    );
  };

