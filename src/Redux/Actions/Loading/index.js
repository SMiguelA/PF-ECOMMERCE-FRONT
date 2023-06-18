import { LOADINGFORM } from "../../actionsTypes"


export const LoadingActionForm = (boolean) => {
    return {
        type:LOADINGFORM,
        payload:boolean
    }
}