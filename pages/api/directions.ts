import { NextApiRequest, NextApiResponse } from "next";

const getGoogleDirections = async (req: NextApiRequest, res: NextApiResponse) => {
  const { originX, originY, destinationX, destinationY } = req.query;

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originX},${originY}&destination=${destinationX},${destinationY}&mode=driving&key=AIzaSyDjtWDYguFO-KBsU5rxdP4imQDi_ulp9Ek`;
  const response = await fetch(url);
  const json = await response.json();

  json.url = url;

  return res.status(200).json(json);
}

export default getGoogleDirections;