"use client";

import { BusLinesFavs } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface Context {
  isShowFavs: boolean;
  setIsShowFavs: (isShow: boolean) => void;
  favs: BusLinesFavs;
  setFavs: (favs: BusLinesFavs) => void;
  valueToFilter: string;
  setValueToFilter: (valueToFilter: string) => void;
  isShowIosModal: boolean;
  setIsShowIosModal: (show: boolean) => void;
}

interface Props {
  children: Readonly<ReactNode>;
}

const initialState: Context = {
  isShowFavs: false,
  setIsShowFavs: () => {},
  favs: [],
  setFavs: () => {},
  valueToFilter: "",
  setValueToFilter: () => {},
  isShowIosModal: false,
  setIsShowIosModal: () => false
};

export const BusLinesContext = createContext<Context>(initialState);
export const useBusLinesContext = () => useContext(BusLinesContext);

export default function BusLinesContextProvider({ children }: Props) {
  const [isShowFavs, setIsShowFavs] = useState(initialState.isShowFavs);
  const [favs, setFavs] = useState(initialState.favs);
  const [valueToFilter, setValueToFilter] = useState(initialState.valueToFilter);
  const [isShowIosModal, setIsShowIosModal] = useState(initialState.isShowIosModal);

  return (
    <BusLinesContext.Provider
      value={{ isShowFavs, setIsShowFavs, favs, setFavs, valueToFilter, setValueToFilter, isShowIosModal, setIsShowIosModal }}
    >
      {children}
    </BusLinesContext.Provider>
  );
}