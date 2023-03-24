<script>
	import { onMount } from 'svelte';
    import SvelteMarkdown from 'svelte-markdown'
	import filterPosts from '../functions/filterPosts';
    import getPostType from '../functions/getPostType';
    import getTimestamps from '../functions/getTimestamps';
    import toggleDisplay from '../functions/toggleDisplay';

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
        const response = await fetch('https://www.reddit.com/r/avexchange.json');
        const responseJSON = await response.json();
        if (responseJSON.kind == 'Listing') {
            let allPosts = responseJSON.data.children;
            if (allPosts && allPosts.length > 0) {
                posts = filterPosts(allPosts);
            }
        }
    });
</script>

<style>
    .post_notes {
        display: flex;
    }

    .post_notes h3:not(:first-child) {
        margin-left: 20px;
    }

    .post_content {
        display: none;
        margin: 20px 0px;
    }
</style>

<h1>Subredditshop</h1>
<p>Content below!<br /></p>
<div>
	{#each posts as post}
        <h1>{post.data.title}</h1>
        <div class="post_notes">
            <h3>Post Type: {getPostType(post.data.title)}</h3>
            <h3><a href="https://www.reddit.com{post.data.permalink}" target="_blank" rel="noreferrer">Permalink</a></h3>
            {#each getTimestamps(post.data.selftext) as timestamp, timestampCount}
                <h3><a href={timestamp} target="_blank" rel="noreferrer">Timestamp #{timestampCount + 1}</a></h3>
            {/each}
        </div>
        {#if post.data.thumbnail}
            <figure>
                <img src={post.data.thumbnail} alt={post.data.title}>
            </figure>
        {/if}
        {#if post.data.selftext}
            <div>
                <button on:click={() => toggleDisplay(post.data.name)}>Click to show post content</button>
                <div id={post.data.name} class="post_content">
                    <SvelteMarkdown source={post.data.selftext} />
                </div>
            </div>
        {:else}
            <p><i>This post has no content</i></p>
        {/if}
	{:else}
		<!-- this block renders when photos.length === 0 -->
		<p>Loading...</p>
	{/each}
</div>