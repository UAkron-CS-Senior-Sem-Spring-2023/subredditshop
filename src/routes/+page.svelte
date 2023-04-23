<script>
    import { onMount } from 'svelte';
    import filterPosts from '../functions/filterPosts';
    import { Stretch } from 'svelte-loading-spinners';

    /**
     * @type {any[]}
     */
    let posts = [];
    let subreddit = "";
    let sort = "new";
    let loading = false;
    let searched = false;

    /**
     * @param {string} id
     */
    function toggleLoading(id) {
        let target_button = document.getElementById(id + "_button");
        let spinner = document.getElementById(id + "_spinner");
        if (target_button) {
            target_button.style.display = (target_button.style.display == "none" ? "block" : "none");
        }
        if (spinner) {
            spinner.style.display = (spinner.style.display == "none" || spinner.style.display == "" ? "block" : "none");
        }
    }

    /**
     * @param {string} id
     */
    function toggleContentDrop(id) {
        let target = document.getElementById(id);
        if (target) {
            target.style.display = (target.style.display == "none" || target.style.display == "" ? "block" : "none");
        }
        let target_button = document.getElementById(id + "_button");
        if (target_button) {
            target_button.innerHTML = (target_button.innerHTML == "+" ? "-" : "+");
        }
    }

    /**
     * @param {string} id
     * @param {string} title
     * @param {string} content
     * @param {string} permalink
     */
     async function generateListing(id, title, content, permalink) {
        if (!loading) {
            let loaded = false;
            let target = document.getElementById(id);
            if (target) {
                if (target.innerHTML != "") {
                    loaded = true;
                }
            }
            if (!loaded) {
                document.querySelectorAll(".post_header button").forEach((button) => {
                    button.classList.add("disabled");
                });
                loading = true;
                toggleLoading(id);
                const response = await fetch('/api/generate_listing', {
                    method: 'POST',
                    body: JSON.stringify({"title": title, "content": content}),
                    headers: {
                        'content-type': 'application/json'
                    }
                });

                let results = await response.json();

                toggleLoading(id);

                results = JSON.parse(results);

                document.querySelectorAll(".post_header button").forEach((button) => {
                    button.classList.remove("disabled");
                });
                loading = false;

                if (results.post_type == "Selling") {
                    let result_html = "";
                    if (target) {
                        if (results.truncated) {
                            result_html += "<p>Note: Not all information may be shown due to token limit.</p>"
                        }
                        if (results.timestamps) {
                            result_html += '<div id="' + id + '_notes" class="post_notes">';
                            if (permalink) {
                                result_html += '<h3><a href="https://reddit.com' + permalink + '" target="_blank" rel="noreferrer">Permalink</a></h3>';
                            }
                            results.timestamps.forEach((/** @type {String} */ timestamp, /** @type {Number} */ index ) => {
                                result_html += '<h3><a href="' + timestamp + '" target="_blank" rel="noreferrer">Timestamp #' + (index + 1).toString() + ' </a></h3>';
                            });
                            result_html += '</div>';
                        }
                        if (results.items) {
                            result_html += '<div class="item_container">'
                            results.items.forEach((/** @type {{name: string, description: string, prices: [{price: string, type: string, price_includes_shipping_cost: boolean}], trades_accepted: [string]}} */ item) => {
                                result_html += '<div class="item">'
                                if (item.name) {
                                    result_html += '<p class="item_title">' + item.name + '</p>';
                                }
                                if (item.prices && item.prices.length > 0) {
                                    result_html += '<div class="prices">';
                                    result_html += '<p>Prices</p>';
                                    item.prices.forEach((price) => {
                                        result_html += '<p>' + price.price + ' ' + price.type + '</p>';
                                        if (price.price_includes_shipping_cost) {
                                            result_html += '<p>Shipping included in price</p>'
                                        } else {
                                            result_html += '<p class="no_shipping">Shipping NOT included in price.</p>';
                                        }
                                    });
                                    result_html += '</div>';
                                }
                                if (item.description && item.description != "") {
                                    result_html += '<p class="item_description">' + item.description + '</p>';
                                }
                                if (item.trades_accepted && item.trades_accepted.length > 0) {
                                    result_html += '<div class="trades">';
                                    result_html += '<p>Trades</p>';
                                    item.trades_accepted.forEach((trade) => {
                                        result_html += '<p>' + trade + '</p>';
                                    });
                                    result_html += '</div>';
                                }
                                result_html += "</div>"
                            });
                            result_html += '</div>'
                        }
                        target.innerHTML = result_html
                        toggleContentDrop(id);
                    }
                } else {
                    if (target) {
                        if (permalink) {
                            target.innerHTML += '<h3><a href="https://reddit.com' + permalink + '" target="_blank" rel="noreferrer">Permalink</a></h3>';
                        }
                        target.innerHTML += "<p>No content to be shown.</p>";
                        toggleContentDrop(id);
                    }
                }
            } else {
                toggleContentDrop(id);
            }
        }
    }

    async function fetchSubreddit() {
        let content = document.getElementById("content");
        if (content) {
            content.innerHTML = "";
        }
        posts = [];
        searched = true;
        const response = await fetch('https://www.reddit.com/r/' + subreddit + '/' + sort + '.json');
        const responseJSON = await response.json();
        if (responseJSON.kind == 'Listing') {
            let allPosts = responseJSON.data.children;
            if (allPosts && allPosts.length > 0) {
                posts = filterPosts(allPosts);
            }
        }
    }

    onMount(() => {
        let search_input = document.getElementById("search_input");
        if (search_input) {
            search_input.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    let search_button = document.getElementById("search_button");
                    if (search_button) {
                        search_button.click();
                    }
                }
            });
        }
    });
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    .banner {
        background-color: #ff4500;
        text-align: center;
        color: white;
        padding: 20px 0px 20px 0px;
        margin: 0 0 10px 0;
        font-size: 40px;
        @media screen and (max-width: 500px) {
            font-size: 32px;
        }
    }

    :global(.item_container) {
        display: flex;
        flex-wrap: wrap;
    }

    :global(.item) {
        border: 3px solid #ff4500;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        min-width: 180px;
        max-width: 20%;
        margin: 20px;
    }

    :global(.item_title) {
        margin: 0;
        padding: 5px;
        text-align: center;
        background-color: #ff4500;
        color: white;
        border-radius: 5px 5px 0px 0px;
        font-weight: bold;
    }

    :global(.item_description) {
        margin: 10px;
    }
    
    :global(.post_notes) {
        display: flex;
        flex-wrap: wrap;
    }

    :global(.post_notes a) {
        color: #ff4500;
    }

    :global(.post_notes h3:not(:first-child)) {
        margin-left: 20px;
    }

    :global(.prices, .trades) {
        color: green;
        text-align: center;
        margin: 5px 0px;
    }

    :global(.prices p, .trades p) {
        margin: 5px 0px;
    }

    :global(.no_shipping) {
        color: red !important;
    }

    .post {
        border: 4px solid #ff4500;
        border-radius: 20px;
        margin: 20px;
        padding: 10px;
        box-shadow: 10px 10px 8px #888;
    }

    .post_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .post_header h1 {
        font-size: 28px;
        @media screen and (max-width: 800px) {
            font-size: 20px;
        }
    }

    .post_header button {
        background: none;
        border: none;
        color: #ff4500;
        font-size: 80px;
        cursor: pointer;
        width: 60px;
        max-width:60px;
    }

    :global(.disabled) {
        color: gray !important;
        cursor: default !important;
    }

    .spinner {
        display: none;
        width: 60px;
        max-width: 60px;
    }

    .search {
        display: flex;
        justify-content: center;
        margin: 20px 0px 20px 0px;
        font-size: 18px;
    }

    .search input, button {
        font-size: 20px;
    }

    .search button {
        background-color: #ff4500;
        border: none;
        color: white;
    }

    .search label {
        margin: 0px 10px;
    }

    .post_content {
        margin: 0px 20px 20px 20px;
        display: none;
        font-size: 18px;
    }

    .content_spinner {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>

<h1 class="banner">Subredditshop</h1>
<div class="search">
    <label>
        <input type=radio bind:group={sort} value={"new"}>
        New
    </label>
    <label>
        <input type=radio bind:group={sort} value={"hot"}>
        Hot
    </label>
    <label>
        <input type=radio bind:group={sort} value={"rising"}>
        Rising
    </label>
</div>
<div class="search">
    <input id="search_input" bind:value={subreddit} placeholder="Enter a subreddit..."><button id="search_button" on:click={fetchSubreddit}>Search</button>
</div>
{#if searched}
    <div id="content" class="content">
        {#each posts as post}
            <div class="post">
                <div class="post_header">
                    <h1>{post.data.title}</h1>
                    <button id={post.data.name}_button on:click={() => generateListing(post.data.name, post.data.title, post.data.selftext, post.data.permalink)}>+</button>
                    <div id="{post.data.name}_spinner" class="spinner">
                        <Stretch size="60" color="#FF3E00" unit="px" duration="1.2s" />
                    </div>
                </div>
                <div id={post.data.name} class="post_content">
                </div>
            </div>
        {:else}
            <div class="content_spinner">
                <Stretch size="100" color="#FF3E00" unit="px" duration="1.2s" />
            </div>
        {/each}
    </div>
{/if}