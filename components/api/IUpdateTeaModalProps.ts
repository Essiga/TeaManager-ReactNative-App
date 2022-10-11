import {Tea} from "../../openAPI";

export interface IUpdateTeaModalProps {
    tea: Tea;
    toggleUpdateTeaModalVisibility: () => void;
}