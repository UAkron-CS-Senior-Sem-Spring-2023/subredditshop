import { ChatGPTAPI } from 'chatgpt'
import { OPENAI_API_KEY } from '$env/static/private'

export async function load() {
    if (OPENAI_API_KEY) {
        const api = new ChatGPTAPI({
            apiKey: OPENAI_API_KEY,
            systemMessage: ''
        });
        const res = await api.sendMessage('Hello World!');
        console.log(res.text);
    } else {
        console.log("ERR: No OpenAI Key");
    }
}
/*
export async function load() {
    let authResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${env.CLIENT_ID}:${env.SECRET}`
        },
        body: `grant_type=password&username=${env.USERNAME}&password=${env.PASSWORD}`
    });
    let authResponseJSON = await authResponse.json();
    return {
        response: authResponseJSON,
    }
}
*/