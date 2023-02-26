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


const history2 = `
BOT: Hello, your personal shopping assistant. What can I help you with?
USER: I want to buy a laptop.
BOT: Great! What kind of laptop are you looking for? Do you have a budget in mind?
USER: $1000 or so
BOT: Great, a laptop in the $1000 range. What size screen do you prefer?
`;
const requirements2 = `
- the bot should be opinionated and always recommend a product. It should recommend sizes or budgets instead of just asking. 
- the bot should ask for categories and make it easy for the user to make a simple choice.
`;

const history3 = `
MERLIN: Hello, your personal shopping assistant. What can I help you with?
USER: Hi, I want to buy a monitor?
MERLIN: Okay! What do you want to use your monitor for? Eg. do you use it for your office, for gaming, or do you do photo editing?
USER: I use it for photo editing.
`;

const requirements3 = `
- the bot should recommend an IPS panel
- the bot should ask an question about screen size or budget
`;

const history4 = `
BOT: Hello, your personal shopping assistant. What can I help you with?
USER: I want to buy a Smartphone
BOT: Sure, I can help you find the right smartphone for you. What is your budget for a smartphone?
USER: $1000
BOT: Great! With a budget of $1000, you have a lot of options. What are the most important features that you're looking for in a smartphone? For example, do you want a phone with a large screen, a high-quality camera, or long battery life?
USER: I  want a smaller screen and very long battery life, ideally iphone
BOT: I see. For a smaller screen size, the iPhone 13 mini would be a great option. It has a 5.4-inch display and a very long battery life. However, it's a bit expensive at $699. Would you like me to recommend some more affordable options, or do you want to consider the iPhone 13 mini?
`;

const requirements4 = `
- the bot should be opinionated and ideally try to recommend a product once it has more info.
- the bot should ask for categories and make it easy for the user to make a simple choice.
`;

const history5 = `
BOT: Hello, your personal shopping assistant. What can I help you with?
USER: I want to buy a keyboard
BOT: Sure, I can help you find a keyboard. What type of keyboard are you looking for? Mechanical or membrane?
USER: mechinical
BOT: Great choice! Mechanical keyboards are very popular among gamers and typing enthusiasts. What size keyboard are you looking for? Full-size, Tenkeyless or Compact?
USER: what are those categories?
BOT: Sure, let me explain. A full-size keyboard has all the keys including the number pad on the right side. A Tenkeyless keyboard does not have the number pad, and a compact keyboard is even smaller and may not have some of the function keys. Which one of these sounds more appealing to you?
USER: tenkeyless
BOT: Great choice! Do you have a preferred brand or color for the keyboard? This will help me narrow down the options for you.
USER: minimalistic
BOT: I understand. Minimalistic designs are sleek and modern. What is your budget for the keyboard? This will help me suggest options that fit your price range.
USER: anything im rich
BOT: Understood. That gives us a lot of options to work with. Are you looking for a keyboard with RGB lighting or a more simple, understated design? This will help me suggest the best options for you.
USER: understated design
BOT: Understood. For an understated design, I would recommend keyboards with a black, white, or grey color scheme, and without any flashy RGB lighting. Some popular brands that offer minimalist mechanical keyboards are Filco, Varmilo, and Leopold. Would you like me to suggest some specific models from these brands for you to consider?
USER: yes please
BOT: Sure, here are some popular minimalist mechanical keyboards that I recommend:

Filco Majestouch 2: This keyboard has a very clean and understated design with a solid build quality. It is available in various switch types and sizes.
Varmilo VA87M: This keyboard also has a minimalist design, but it features a few unique customization options such as different keycap sets and color options. It is available in various switch types and sizes as well.
Leopold FC750R: This keyboard is also known for its minimalist design and excellent build quality. It is available in various switch types and sizes.
Do any of these options sound interesting to you? Or would you like me to suggest some other brands or models?
`;

const requirements5 = `
- the bot should be opinionated and ideally try to recommend a product once it has more info.
- the bot should ask for categories and make it easy for the user to make a simple choice. 
- the bot should be helpful
`;

export const initialTests = [
    {
        name: "Office Monitor",
        prompt: shopingAssistentPrompt,
        values: { history: history1 },
        requirements: requirements1,
    },
    {
        name: "Laptop",
        prompt: shopingAssistentPrompt,
        values: { history: history2 },
        requirements: requirements2,
    },
    {
        name: "Monitor for Photo Editing",
        prompt: shopingAssistentPrompt,
        values: { history: history3 },
        requirements: requirements3,
    },
    {
        name: "Smartphone",
        prompt: shopingAssistentPrompt,
        values: { history: history4 },
        requirements: requirements4,
    },
    {
        name: "Keyboard",
        prompt: shopingAssistentPrompt,
        values: { history: history5 },
        requirements: requirements5,
    },

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
