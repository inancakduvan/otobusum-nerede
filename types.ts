import { BusDirections } from "./enums";

export type BusLines = Array<BusLine>;
export type BusLinesFavs = Array<BusLinesFav>;

export interface BusLine {
    HAT_NO: number,
    HAT_ADI: string
}

export interface BusLinesFav {
    stationId: string,
    busNo: string,
    stationName: string,
    direction: BusDirections.Gidiş | BusDirections.Dönüş,
}
