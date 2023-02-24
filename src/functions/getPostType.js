/**
 * @param {string} title
 */
function getPostType(title) {
    try {
        // Assume post type by location of words "Cash" and "Paypal" in title
        let haveString = "";
        let wantString = "";

        // Regexes to get have's and want's from title
        let haveRegex = /\[H\].*?[^\[]*/
        let wantRegex = /\[W\].*?[^\[]*/
        let haveMatch = title.match(haveRegex);
        let wantMatch = title.match(wantRegex);

        if (haveMatch) {
            haveString = haveMatch[0];
        }
        if (wantMatch) {
            wantString = wantMatch[0];
        }

        // Regex needed to determine post type
        let cashRegexes = [/cash\b/i, /\$/i];
        let paypalRegexes = [/paypal\b/i];
        let paymentRegexes = [...cashRegexes, ...paypalRegexes];
        
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
        if (exception instanceof TypeError && exception.message.includes("undefined")) {
            return 'Unknown';
        } else {
            // Rethrow the exception
            throw exception;
        }
    }
    
    return 'Unknown';
}

export default getPostType;
