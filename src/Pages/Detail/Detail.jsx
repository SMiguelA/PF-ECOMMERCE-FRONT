import { useParams } from "react-router"
import { DivContainer } from "../../ComponentsStyles"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function Detail (){
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if(id) dispatch()
    },[id])
    return (
        <DivContainer>
            <div>
                detail{id}
            </div>
            
        </DivContainer>
    )
}