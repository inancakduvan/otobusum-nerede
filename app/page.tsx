import BusLines from "@/components/bus-lines";
import BusLinesContextProvider from "@/context/bus-lines";

export default function Home() {
  return (<>
      <BusLinesContextProvider>
        <BusLines />
      </BusLinesContextProvider>
  </>)
}