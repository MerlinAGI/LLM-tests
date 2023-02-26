// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");
const { GenerateApi, GenerateApiApiKeys } = require("vellum-client-node");

const generate = new GenerateApi();
generate.setApiKey(GenerateApiApiKeys.apiKeyAuth, process.env.VELLUM_API_KEY);

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
    console.log("incoming:", req.body, typeof req.body);
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const prompt = data.prompt;
    // const completion = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: prompt,
    //   max_tokens: 100,
    //   stop: ["\n", "\\", " Human:", " AI:"],
    //   temperature: 0,
    // });

    const generation = await generate.generate({
      deploymentName: "merlin2",
      requests: [{ inputValues: { input: prompt } }],
    });

    res
      .status(200)
      .json({ text: generation.body.results[0].data.completions[0].text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: error ? `Error: ${error}` : "No error" });
  }
}
