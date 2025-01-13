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
};

export const BusLinesContext = createContext<Context>(initialState);
export const useBusLinesContext = () => useContext(BusLinesContext);

export default function BusLinesContextProvider({ children }: Props) {
  const [isShowFavs, setIsShowFavs] = useState(initialState.isShowFavs);
  const [favs, setFavs] = useState(initialState.favs);
  const [valueToFilter, setValueToFilter] = useState(initialState.valueToFilter);

  return (
    <BusLinesContext.Provider
      value={{ isShowFavs, setIsShowFavs, favs, setFavs, valueToFilter, setValueToFilter }}
    >
      {children}
    </BusLinesContext.Provider>
  );
}
