"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface Context {
  showStationsToDirection1: boolean;
  setShowStationsToDirection1: (showStationsToDirection1: boolean) => void;
  busDirectionStart: string;
  setBusDirectionStart: (busDirectionStart: string) => void;
  busDirectionEnd: string;
  setBusDirectionEnd: (busDirectionEnd: string) => void;
  valueToFilter: string;
  setValueToFilter: (valueToFilter: string) => void;
}

interface Props {
  children: Readonly<ReactNode>;
}

const initialState: Context = {
  showStationsToDirection1: true,
  setShowStationsToDirection1: () => { },
  busDirectionStart: "",
  setBusDirectionStart: () => { },
  busDirectionEnd: "",
  setBusDirectionEnd: () => { },
  valueToFilter: "",
  setValueToFilter: () => {},
};

export const BusStationsContext = createContext<Context>(initialState);
export const useBusStationsContext = () => useContext(BusStationsContext);

export default function BusStationsContextProvider({ children }: Props) {
  const [showStationsToDirection1, setShowStationsToDirection1] = useState(initialState.showStationsToDirection1);
  const [busDirectionStart, setBusDirectionStart] = useState(initialState.busDirectionStart);
  const [busDirectionEnd, setBusDirectionEnd] = useState(initialState.busDirectionStart);
  const [valueToFilter, setValueToFilter] = useState(initialState.valueToFilter);

  return (
    <BusStationsContext.Provider
      value={{ showStationsToDirection1, setShowStationsToDirection1, busDirectionStart, setBusDirectionStart, busDirectionEnd, setBusDirectionEnd, valueToFilter, setValueToFilter }}
    >
      {children}
    </BusStationsContext.Provider>
  );
}