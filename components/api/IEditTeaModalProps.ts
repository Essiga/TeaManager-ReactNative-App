import {Tea} from "../../openAPI";

export interface IEditTeaModalProps {
    tea: Tea;
    toggleEditTeaModalVisibility: () => void;
}