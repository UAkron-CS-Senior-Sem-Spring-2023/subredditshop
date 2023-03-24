import uniqueLinks from './uniqueLinks';

/**
 * @param {string} postText
 * 
 * Takes the text of a post as a string and returns the timestamp of the post if found.
 * Currently only returns the first timestamp in the post.
 * 
 * TODO: Return multiple timestamps
 * 
 */
function getTimestamp(postText: string) {
    let timestamps = new Set<string>();
    const timestampRegex = /(?:http|https):(?:\;|\,|\/|\?|\:|\@|\&|\=|\+|\$|\-|\_|\.|\!|\~|\'|\#|\/|[a-z]|[A-Z]|[0-9])+/;
    const timestampMatches = postText.match(timestampRegex);
    if (timestampMatches) {
        for (let i = 0; i < timestampMatches.length; ++i) {
            timestamps.add(timestampMatches[i]);
        }
    }

    // Iterate through each timestamp and ensure that it is unique from every other stamp
    timestamps.forEach((currentTimestamp) => {
        if (typeof currentTimestamp === 'string') {
            let remainingTimestamps = new Set(timestamps);
            remainingTimestamps.delete(currentTimestamp);
            let duplicate = false;
            remainingTimestamps.forEach((remainingTimestamp) => {
                if (typeof remainingTimestamp === 'string') {
                    if (!uniqueLinks(currentTimestamp, remainingTimestamp)) {
                        duplicate = true;
                    }
                }
            });
            if (duplicate) {
                timestamps.delete(currentTimestamp);
            }
        }
    });

    return Array.from(timestamps);
}

export default getTimestamp;
