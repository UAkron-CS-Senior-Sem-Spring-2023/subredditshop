import { describe, it, expect } from 'vitest';
import getPostType from '../functions/getPostType.js';

describe('getPostType', () => {
	// Buying Tests
	it('Gets the post type via paypal being present in the [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] Paypal [W] Sony IER M9')).toBe('Buying');
	});
	it('Gets the post type via cash being present in the [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] Paypal [W] Sony IER M9')).toBe('Buying');
	});
	it('Gets the post type via $ being present in the [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] $300 [W] HD6XX')).toBe('Buying');
	});

	// Selling Tests
	it('Gets the post type via paypal being present in the [W] section of title.', () => {
		expect(getPostType('[USA-FL] [H] HD6XX [W] Cash')).toBe('Selling');
	});
	it('Gets the post type via cash being present in the [W] section of title.', () => {
		expect(getPostType('[USA-FL] [H] Sony IER M9 [W] Cash')).toBe('Selling');
	});
	it('Gets the post type via $ being present in the [W] section of title.', () => {
		expect(getPostType('[USA-FL] [H] Scarlet Audio V2 [W] $450')).toBe('Selling');
	});

	// Trading Tests
	it('Gets the post type via paypal being present in both the [W] and [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] HD6XX, Paypal [W] Paypal, Scarlet Audio V2')).toBe('Trading');
	});
	it('Gets the post type via cash being present in both the [W] and [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] Sony IER M9, Cash [W] Cash, Scarlet Audio V2')).toBe('Trading');
	});
	it('Gets the post type via $ being present in both the [W] and [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] HD6XX, $250 [W] Scarlet Audio V3, $300')).toBe('Trading');
	});
	it('Gets the post type via different payment methods in both the [W] and [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] HD6XX, Cash [W] Paypal, Scarlet Audio V2')).toBe('Trading');
	});


	// Unknown default test
	it('Defaults post type to "Unknown" if it cannot determine post type.', () => {
		expect(getPostType('Poorly formatted reddit title')).toBe('Unknown');
	});
});
