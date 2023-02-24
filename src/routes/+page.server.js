import { env } from '../lib/env.js'

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