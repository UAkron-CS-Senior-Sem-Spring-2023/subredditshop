import { describe, it, expect } from 'vitest';
import uniqueLinks from '../functions/uniqueLinks.js';

describe('uniqueLinks', () => {
    it('Verifies that two links are unique.', async () => {
        const firstLink = "https://imgur.com/a/xyQRegF)";
        const secondLink = "https://imgur.com/a/RODU9b6~~";
        expect(uniqueLinks(firstLink, secondLink)).toBe(true);
    });

    it('Verifies that two links are not unique.', async () => {
        const firstLink = "https://imgur.com/a/RODU9b6";
        const secondLink = "https://imgur.com/a/RODU9b6~~";
		expect(uniqueLinks(firstLink, secondLink)).toBe(false);
	});
});
