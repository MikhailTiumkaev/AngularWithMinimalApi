import { Province } from "./province.model";

export interface Country {
    id: number;
    name: string;
    provinces: Province[]
}
