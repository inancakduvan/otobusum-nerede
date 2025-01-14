import { BusDirections } from "./enums";

export type BusLines = Array<BusLine>;
export type BusLinesFavs = Array<BusLinesFav>;
export type BusStations = Array<BusStation>;
export type ArrivingBuses = Array<ArrivingBus>;

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

export interface BusStation {
    DurakId: number;
    Id: number;
    Adi: string;
    DurakTipi: string;
    KoorX: number;
    KoorY: number;
    BolgeKodu: string;
    GecenHatNumaralari: string;
    Enlem: string;
    Boylam: string;
    IlceId: number;
}

export interface StationOfTargetBus { 
    DURAK_ID: number; 
    DURAK_ADI: string; 
    ENLEM: string; 
    BOYLAM: string; 
    DURAKTAN_GECEN_HATLAR: string; 
}

export type ArrivingBus = {
    KalanDurakSayisi: number;
    HattinYonu: number;
    KoorY: string;
    BisikletAparatliMi: boolean;
    KoorX: string;
    EngelliMi: boolean;
    HatNumarasi: number;
    HatAdi: string;
    OtobusId: number;
};