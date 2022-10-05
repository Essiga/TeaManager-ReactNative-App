import {Tea} from "../../openAPI";

export interface ITeaModalProps {
    tea: Tea;
    toggleTeaModalVisibility: () => void;
}