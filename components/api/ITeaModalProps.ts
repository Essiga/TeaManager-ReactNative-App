import {Tea} from "../../openAPI";

export interface ITeaModalProps {
    tea: Tea;
    toggleTeaModalVisibility: (visibility: boolean) => void;
    toggleAddSessionModalVisibility:(visibility: boolean) => void;
    setUpdateTeaVisible(visibility: boolean): void;
}