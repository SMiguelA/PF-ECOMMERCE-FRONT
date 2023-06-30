import { Outlet , useLocation} from "react-router";
import { DivContainer } from "../../ComponentsStyles";
import { FavoritesView } from "../../Components";

const Favorites = () => {

    const location = useLocation();

    return (
        <>
        {location.pathname === "/favorites" &&(
            <DivContainer>
                <FavoritesView/>
            </DivContainer>
        )}
        <Outlet />
        </>
    )
     
};

export default Favorites;