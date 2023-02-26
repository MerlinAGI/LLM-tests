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
    const prompt = JSON.parse(req.body).prompt;
    const completion = await openai.createCompletion({
      model: "chat-davinci-003-alpha",
      prompt: prompt,
      max_tokens: 100,
      stop: ["\n", "\\", " Human:", " AI:"],
      temperature: 0,
    });

    res.status(200).json({ text: completion.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: error ? "Error" : "No error" });
  }
}
