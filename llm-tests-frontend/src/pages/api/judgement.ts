// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const prompt = data.prompt;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 200,
      stop: "STOP",
      temperature: 0,
    });
    // const r = await fetch("https://api.openai.com/v1/completions",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       model: "text-davinci-003",
    //       prompt: prompt,
    //       max_tokens: 200,
    //     })
    //   }
    // );
    // const completion = await r.json();
    res.status(200).json({ text: completion.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: error ? "Error" : "No error" });
  }
}
