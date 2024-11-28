import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";

const getStations2 = async (req: NextApiRequest, res: NextApiResponse) => {
  let busNo = String(req.url).split("?busNo=")[1];
  busNo = busNo ? busNo : "5";

  const response = await fetch("https://www.ntv.com.tr/eshot-otobus-saatleri/" + busNo);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const stations = document.querySelector(".last-started .bus-services__stations ul")?.innerHTML;

  return res.status(200).send(stations);
}

export default getStations2;