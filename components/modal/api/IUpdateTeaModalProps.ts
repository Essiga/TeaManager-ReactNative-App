import {Tea} from "../../../openAPI";

export interface IUpdateTeaModalProps {
    tea: Tea;
    updateTea:(tea: Tea) => void;
}
