/**
 * @param {string} firstUrl
 * @param {string} secondUrl
 * 
 * Returns whether or not the two supplied links are different from one another
 * 
 */
function uniqueLinks(firstUrl: string, secondUrl: string) {
    if (firstUrl.length > secondUrl.length) {
        for (let i = 0; i < secondUrl.length; ++i) {
            if (secondUrl[i] != firstUrl[i]) {
                return true;
            }
        }
    } else {
        for (let i = 0; i < firstUrl.length; ++i) {
            if (firstUrl[i] != secondUrl[i]) {
                return true;
            }
        }
    }
    return false;
}

export default uniqueLinks;
