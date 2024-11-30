import { NextApiRequest, NextApiResponse } from "next";

const getStationsDirection1 = async (req: NextApiRequest, res: NextApiResponse) => {
  let busNo = String(req.url).split("?busNo=")[1];
  busNo = busNo ? busNo : "5";

  const response = await fetch("https://www.eshot.gov.tr/tr/UlasimSaatleri/HattinDuraklariniGetir/?hatId=" + busNo + "&hatYon=1");
  const json = await response.json();

  return res.status(200).json(json);
}

export default getStationsDirection1;