// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  res.setHeader("Cache-Control", "s-maxage=600");

  if (!process.env.WEATHER_API_KEY) {
    return res.status(500).end("Missing API key");
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("lat", "44.526340");
  url.searchParams.set("lon", "-109.056534");
  url.searchParams.set("appid", process.env.WEATHER_API_KEY);
  url.searchParams.set("units", "imperial");

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
