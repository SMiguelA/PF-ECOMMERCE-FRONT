import { useParams } from "react-router-dom";
import CDImages from "../../Components/ComponentDetail/CDImages";
import CDData from "../../Components/ComponentDetail/CDData";

export default function ComponentDetailPage (){
    const { componentName } = useParams();
    return (
        <div>
            <div>
                <h1>{componentName}</h1>
            </div>
            <div>
                <CDImages />
            </div>
            <div>
                <CDData />
            </div>
        </div>
    )
}