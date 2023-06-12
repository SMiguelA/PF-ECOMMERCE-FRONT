import { useDispatch, useSelector } from "react-redux";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Actions";

import style from "./Navigation.module.css";

export default function Home() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  const handleLogout = (e) => {
    dispatch(logout());
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className={style.container}>
      <div className={style.leftItem}>
        <Link to="/" className={style.noLinea}>
          <h1>E-Commerce</h1>
        </Link>
      </div>
      <div className={style.rigthItem}>
        <Link to="/login">
          <h1>Login</h1>
        </Link>
      </div>{" "}
      <div className={style.rigthItem}>
        {user && (
          <>
            <button onClick={handleLogout}>LOGOUT</button>

            {!user.isAdmin && (
              <>
                <nav>
                  <ul>
                    <li
                      className="nav-item"
                      onMouseEnter={handleHover}
                      onMouseLeave={handleHover}
                    >
                      <span>{user.email}</span>
                      {isHovered && (
                        <ul>
                          <li>
                            <Link to="/cart" className={style.nav}>
                              Cart
                            </Link>
                          </li>
                          <li>MIS ORDENES</li>
                          <li>
                            <button onClick={handleLogout}>LOGOUT</button>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </nav>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
