import { useParams } from "react-router-dom";
import GDData from "../../Components/GameDetail/GDData";
import GDImages from "../../Components/GameDetail/GDImages";

export default function GameDetailPage(){
    const { gameName } = useParams();
    return (
        <div>
            <div>
                <h1>{gameName}</h1>
            </div>
            <div>
                <GDImages />
            </div>
            <div>
                <GDData />
            </div>
        </div>
    )
}