// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  res.setHeader("Cache-Control", "s-maxage=60");

  if (!process.env.WEATHER_API_KEY) {
    return res.status(500).end("Missing API key");
  }

  const url = new URL(
    "https://source.unsplash.com/collection/2310706/2400x1600"
  );

  const imageResponse = await fetch(url);
  const imageData = await imageResponse.arrayBuffer();
  const base64Image = Buffer.from(imageData).toString("base64");

  res.status(200).json({ imageData: `data:image/jpeg;base64,${base64Image}` });
}
