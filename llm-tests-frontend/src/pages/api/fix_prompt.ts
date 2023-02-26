// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");
// npm install vellum-client-node
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
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const prompt = data.prompt;
    const feedback = data.feedback;
    const promptToSend = `
You are given a prompt and feedback to this prompt. Please update the prompt to fix the issues raised in the feedback.
The prompt reaches until the "-------------------------" sequence.
PROMPT:
${prompt}
-------------------------
FEEDBACK:
${feedback}

NEW PROMPT:
`;

    const generation = await generate.generate({
      deploymentName: "merlin-gen-tests",
      requests: [{ inputValues: { input: promptToSend } }],
    });
    // const completion = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: promptToSend,
    //   max_tokens: 500,
    //   // stop: ["\n", "\\", " Human:", " AI:"],
    //   temperature: 0,
    // });

    res
      .status(200)
      .json({ text: generation.body.results[0].data.completions[0].text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: error ? "Error" : "No error" });
  }
}
