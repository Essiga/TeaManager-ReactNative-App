import {Tea} from "../../../openAPI";

export interface IDetailedTeaModalProps {
    tea: Tea;
    toggleTeaModalVisibility: (visibility: boolean) => void;
    toggleAddSessionModalVisibility:(visibility: boolean) => void;
}
