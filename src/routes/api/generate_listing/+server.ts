import { ChatGPTAPI } from 'chatgpt'
import { OPENAI_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


const postDataPrompt = `
There are several rules you must follow:
1. Return only the JSON object in future responses. Do not respond to this message.
2. (IMPORTANT): Do not add more newlines than necessarry for the JSON to be syntactically correct! Example of what I want: {"post_type":"Selling","truncated":"","timestamps":[""],"items":[{"name":"","description":"","prices":[{"price":"","type":"", "price_includes_shipping_cost":""}],"trades_accepted":[]}]}
2. Do not write any additional text.
3. Truncate the items array in your response to fit within 4096 tokens, getting as close to the token limit as possible. If you leave out items, set "truncated" to "True" and do not make any more note of it - otherwise set it to "False". Do not remove any information in the item object.
The following is the task:
Given a JSON object containing the title and content of a Reddit post, generate a JSON object that includes the post type (Selling, Other), timestamps (links to pictures of items), items (including item lots and their contents), item descriptions, price (and if the price includes shipping for each price), and any items the poster is willing to trade for. Group item information in its respective object. If the post type is "Selling", the JSON object should be formatted as noted in rule 2.
If the post type is not "Selling", the JSON object should only contain the post type.
NOTE: If a price is listed as ($20 shipped), it means shipping is included in the price.
`;

if (!OPENAI_API_KEY) {
    console.log("ERR: No OpenAI Key");
}

const postDataAPI = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY,
    systemMessage: postDataPrompt,
    maxResponseTokens: 2048,
    completionParams: {
        temperature: 0.4,
    },
    debug: true,
});

export const POST = (async ({ request }) => {
    const post_data = JSON.stringify(await request.json());
    const res = await postDataAPI.sendMessage(post_data);
    return json(res.text);
}) satisfies RequestHandler;
