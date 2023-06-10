import { Nav } from "../../ComponentsStyles"
import styles from "./styles.module.css"
import { StyledLink } from "../../ComponentsStyles"
import { HiHome } from 'react-icons/hi';
import { AiFillFire } from 'react-icons/ai';
import { AiFillAppstore } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';


export default function Navbar(){

    return(
        <Nav>
            <ul className={styles.containerUl}>

                <StyledLink to="/" style={{listStyle:"none"}}>
                    <li>
                        <HiHome size={25} style={{ marginBottom: '5px' , marginRight:"5px"}}/> Home
                    </li>
                </StyledLink>
                <StyledLink to="/store">
                    <li>
                        <AiFillFire size={25} style={{ marginBottom: '5px' , marginRight:"13px"}}/> Store
                    </li>
                </StyledLink>
                <StyledLink to="">
                    <li>
                        <AiFillAppstore size={25} style={{ marginBottom: '5px' }} /> Library
                    </li>
                </StyledLink>
                <StyledLink to="">
                    <li>
                        <FaUserFriends size={25} style={{ marginBottom: '5px' }} /> Friends
                    </li>
                </StyledLink>
                
            </ul>
        </Nav>
    )
}