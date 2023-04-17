import { ChatGPTAPI } from 'chatgpt'
import { OPENAI_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


const prompt = `
Return only the JSON object in future responses with no further comments.
I will provide you a JSON object that contains the title and content of a Reddit post. You need to return a JSON object with details such as the type of post (Buying, Selling, Price Check, Giveaway), the post's timestamps (links to images showing the items in the post), the items noted in the post (if it is an item lot, title the item as the lot and list which items are included in the description), the price of the item (if any), and the items the poster is willing to trade for their item (if any, example: "trades_accepted": ["Jellykey Koi Pond 2", "Scarlet V2"], or "trades_accepted": [] if there are no items the poster wants to trade). You will group all information about an item inside of an item object. Obtain this information from a combination of both the title and content of the post.
If the post type is "Selling", the JSON object should be formatted as follows:
{ "post_type": "Selling", "timestamps": [""], "items": [ { "name": "", "description": "", "prices": [ { "price": "", "type": "" } ], "trades_accepted": [] } ] }
If the post type is not "Selling", the JSON object should only contain the post type as follows:
{ "post_type": "" }
`;

if (!OPENAI_API_KEY) {
    console.log("ERR: No OpenAI Key");
}

const api = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY,
    systemMessage: prompt
});

export const POST = (async ({ request }) => {
    const post_data = JSON.stringify(await request.json());
    console.log(post_data);
    const res = await api.sendMessage(post_data);
    console.log(res.text);
    /*
    const res = await api.sendMessage(`
    {
        "content": "~~7600x $180 shipped(CONUS~~) - SOLD\n\n~~used about 3month, changed to 13600k~~\n\n~~please send me a message if you are interested~~\n\n&amp;#x200B;\n\n[~~https://imgur.com/a/PKPhC8h~~](https://imgur.com/a/PKPhC8h)",
        "title": "[USA-NJ] [H] AMD 7600x [W] local cash, paypal",
    }
    `);
    */
    return json(res.text);
}) satisfies RequestHandler;
