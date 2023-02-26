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
    const promptToSend = `Generate test cases for this prompt where you generate the history and the requirements. The test should check if the AI is a good shopping assistant.

    ${prompt}
    ---------------------
    
    DON'T GENERATE THE LAST MERLIN, INSTEAD WRITE "INSERT PROMPT". 
    
    
    EXAMPLE TEST:
    HISTORY
    MERLIN: Hello, your personal shopping assistant. What can I help you with?
    USER: Hi, I’m looking for a monitor for my office. I do software development so it should be pretty large and have a high resolution. Roughly $500
    MERLIN: INSERT PROMPT
    
    REQUIREMENTS
    - recommend a screen size of at least 24 inches.
    - it can include a refresh rate that is 60hz but not higher, but it's not required
    - must include a resolution of 4k or higher
    
    HISTORY
    MERLIN: Hello, your personal shopping assistant. What can I help you with?
    USER: I want to buy a laptop.
    MERLIN: Great! What kind of laptop are you looking for? Do you have a budget in mind?
    USER: $1000 or so
    MERLIN: INSERT PROMPT
    
    REQUIREMENTS
    - Merlin should be opinionated and always recommend a product. It should recommend sizes or budgets instead of just asking. 
    - MERLIN should ask for categories and make it easy for the user to make a simple choice.
    
    HISTORY
    
    MERLIN: Hello, your personal shopping assistant. What can I help you with?
    USER: Hi, I want to buy a monitor?
    MERLIN: Okay! What do you want to use your monitor for? Eg. do you use it for your office, for gaming, or do you do photo editing?
    USER: I use it for photo editing. What display type should I choose?
    MERLIN: INSERT PROMPT
    
    REQUIREMENTS
    - the bot should recommend an IPS panel
    - the bot should ask an question about screen size or budget
    
    
    TESTS:
    HISTORY`;

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
