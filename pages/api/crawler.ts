import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";

const getDownloads = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("https://www.ntv.com.tr/eshot-otobus-saatleri/5");
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const stations = document.querySelector(".first-started .bus-services__stations ul")?.innerHTML;

  return res.status(200).send(stations);
}

export default getDownloads;