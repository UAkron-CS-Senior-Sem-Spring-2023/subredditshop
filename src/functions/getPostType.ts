/**
 * @param {string} title
 * 
 * Determines the post type based on the title of the post.
 * 
 */
function getPostType(title: string) {
    try {
        // Determine post type by presence of keywords
        const sellingKeywords: string[] = [
            '[WTS]',
            '[FS]'
        ]
        const buyingKeywords: string[] = [
            '[WTB]'
        ];
        const giveawayKeywords: string[] = [
            '[FREE]'
        ]

        const keywordsDict: { [key: string]: string[] } = {
            'Selling': sellingKeywords,
            'Buying': buyingKeywords,
            'Giveaway': giveawayKeywords
        }

        for (const postType in keywordsDict) {
            for (let i = 0; i < keywordsDict[postType].length; ++i) {
                if (title.includes(keywordsDict[postType][i])) {
                    return postType;
                }
            }
        };

        // Determine post type by location of words "Cash" and "Paypal" in title
        let haveString = '';
        let wantString = '';

        // Regexes to get have's and want's from title
        const haveRegex = /\[H\].*?[^\[]*/
        const wantRegex = /\[W\].*?[^\[]*/
        const haveMatch = title.match(haveRegex);
        const wantMatch = title.match(wantRegex);

        if (haveMatch) {
            haveString = haveMatch[0];
        }
        if (wantMatch) {
            wantString = wantMatch[0];
        }

        // Regex needed to determine post type
        const cashRegexes = [/cash\b/i, /\$/i];
        const paypalRegexes = [/paypal\b/i];
        const paymentRegexes = [...cashRegexes, ...paypalRegexes];
        
        let hasMoney, wantsMoney = false;

        for (let i = 0; i < paymentRegexes.length; ++i) {
            if (haveString.match(paymentRegexes[i])) {
                hasMoney = true;
            }
            if (wantString.match(paymentRegexes[i])) {
                wantsMoney = true;
            }
        }

        if (wantsMoney && !hasMoney) {
            return 'Selling';
        } else if (!wantsMoney && hasMoney) {
            return 'Buying';
        } else if (wantsMoney && hasMoney) {
            return 'Trading';
        }
    } catch (exception) {
        // Handle only undefined exceptions
        if (exception instanceof TypeError && exception.message.includes('undefined')) {
            return 'Unknown';
        } else {
            // Rethrow the exception
            throw exception;
        }
    }
    
    return 'Unknown';
}

export default getPostType;
