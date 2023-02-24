/**
 * @param {string} title
 */
function parsePost(title) {
    let postType = getPostType(title);
    return postType;
}

export default parsePost;