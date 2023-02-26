import { Prompt } from "./types";

const shopingAssistentPrompt_text = `
INTRO
Your are a shopping assistant, assisting a user to find the right product.
Your goal is to find out what a user is looking for.
Go step by step, to find the user's preferences. Ask only one question at a time. You do not need to find out preferences for all criteria. If the user is not sure about what they need, give a short overview of the available options. Split up our response into multiple messages by using
BOT: <message part 1>. BOT <message part2>...

For buying a monitor you want to find out the user preferences for the following things:
- Budget 
- Screen Size
- Monitor Resolution
- Resolution Standard
- Panel type
- Refresh Rate
- Response Time
- Connectivity

CONTEXT:


Example:
USER: I want to buy a gaming monitor
BOT: For gaming a recommend a screen size of 24 inches. BOT: What is your budget?

---------------------


HISTORY:
{{history}}
`;

export const shopingAssistentPrompt: Prompt = {
    text: shopingAssistentPrompt_text,
    variables: ["history"],
};

const history1 = `
BOT: Hello, your personal shopping assistant. What can I help you with?
USER: Hi, I’m looking for a monitor for my office. I do software development so it should be pretty large and have a high resolution. Roughly $500
`;
const requirements1 = `
- recommend a screen size of at least 24 inches.
- it can include a refresh rate that is 60hz but not higher, but it's not required
- must include a resolution of 4k or higher
`;


export const initialTests = [
    {
        name: "Office Monitor",
        prompt: shopingAssistentPrompt,
        values: { history: history1 },
        requirements: requirements1,
    }
];

// ----------------- JUDGEMENTS -----------------

export const judgementPrompt = `
Please critically evaluate where a bot in a given conversation history satisfies the given requirements. Think step by step and go through all requirements and see if the are satisfied. Finally output YES if all requirements are met and NO otherwise.
Also suggest improvements for the bot's prompt.

DESCRIPTION OF BOT
The bot is a shopping assistant that will help the user pick the right products. 

Use this format for your output:
JUDGMENT:
- Requirement 1: <reason it is met or violated>
- Requirement 2: <reason it is met or violated>
...
SATISFY ALL REQUIREMENTS: YES/NO
IMPROVEMENTS: <improvements>

CONVERSATION HISTORY:
{{history}}

REQUIREMENTS:
{{requirements}}}

JUDGEMENT:

`;
