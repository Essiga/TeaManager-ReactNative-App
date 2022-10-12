import {Tea} from "../../../openAPI";

export interface IUpdateTeaModalProps {
    tea: Tea;
    toggleUpdateTeaModalVisibility: (visibility: boolean) => void;
    updateTea:(tea: Tea) => void;
}
