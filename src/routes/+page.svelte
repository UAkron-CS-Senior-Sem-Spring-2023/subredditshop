<script>
    import { onMount } from 'svelte';
	import filterPosts from '../functions/filterPosts.js';
    import getPostType from '../functions/getPostType.js';
    /**
	 * @type {any}
	 */
    export let data;

    /**
	 * @type {any[]}
	 */
    let posts = [];

    onMount(async () => {
        /*
        let authResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${env.CLIENT_ID}:${env.SECRET}`
            },
            body: `grant_type=password&username=${env.USERNAME}&password=${env.PASSWORD}`
        });
        */
        console.log(data.response);
        let response = await fetch('https://www.reddit.com/r/mechmarket.json');
        let responseJSON = await response.json();
        if (responseJSON.kind == 'Listing') {
            let allPosts = responseJSON.data.children;
            if (allPosts && allPosts.length > 0) {
                posts = filterPosts(allPosts);
            }
        }
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href='https://kit.svelte.dev'>kit.svelte.dev</a> to read the documentation</p>
<p>Content below!<br /></p>
<div>
	{#each posts as post}
        <h1>{post.data.title}</h1>
        <h3>Post Type: {getPostType(post.data.title)}</h3>
		<figure>
			<img src={post.data.thumbnail} alt={post.data.title}>
		</figure>
	{:else}
		<!-- this block renders when photos.length === 0 -->
		<p>Loading...</p>
	{/each}
</div>