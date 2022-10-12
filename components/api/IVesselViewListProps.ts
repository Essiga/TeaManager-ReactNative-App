import {Vessel} from "../../openAPI";

export interface IVesselViewListProps {
    vessels: Vessel[];
    deleteVessel: (id: number) => void;
}
