/**
 * @param {Object[]} posts
 * 
 * Takes an array of posts and filters out any "stickied" posts.
 * 
 * Note: "stickied" posts are generally rules of the subreddit and do
 * not need to be displayed.
 * 
 */
function filterPosts(posts: Object[]) {
    for (let i = 0; i < posts.length; ++i) {
        // @ts-ignore
        if (posts[i].data.stickied || posts[i].data.pinned) {
            posts.splice(i, 1);
            i -= 1;
        }
    }
    return posts;
}

export default filterPosts;
