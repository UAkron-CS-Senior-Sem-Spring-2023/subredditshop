/**
 * @param {Object[]} posts
 */
function filterPosts(posts) {
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
