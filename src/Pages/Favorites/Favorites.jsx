import { Outlet } from "react-router";
import { DivContainer } from "../../ComponentsStyles";
import { FavoritesView } from "../../Components";

const Favorites = () => {
    return (
        <>
        {(
            <DivContainer>
                <FavoritesView/>
            </DivContainer>
        )}
        <Outlet />
        </>
    )
     
};

export default Favorites;