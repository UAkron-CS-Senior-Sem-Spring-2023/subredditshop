/**
 * @param {string} id
 * 
 * Toggles display of given element id between "none" and "block"
 * 
 */
function toggleDisplay(id: string) {
    let item = document.getElementById(id);
    if (item) {
        if (!item.style.display || item.style.display === "none") {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    }
}

export default toggleDisplay;