import { describe, it, expect } from 'vitest';
import filterPosts from '../functions/filterPosts.js';
import sampleJSON from './sample_data/hardwareswap.json'

describe('filterPosts', () => {
	it('Removes sticked and pinned posts.', async () => {
        let allPosts = sampleJSON.data.children;
        let originalLength = allPosts.length;
        let filteredPosts = filterPosts(allPosts);
        let filteredLength = filteredPosts.length;
		expect(originalLength > filteredLength).toBe(true);
	});
});
