import { describe, it, expect } from 'vitest';
import getPostType from '../functions/getPostType';

describe('getPostType', () => {
	// Buying Tests
	it('Gets the post type via paypal being present in the [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] paypal [W] Sony IER M9')).toBe('Buying');
		expect(getPostType('[USA-FL] [H] PAYPAL [W] Sony IER M9')).toBe('Buying');
		expect(getPostType('[USA-FL] [H] Paypal [W] Sony IER M9')).toBe('Buying');
	});
	it('Gets the post type via cash being present in the [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] cash [W] Sony IER M9')).toBe('Buying');
		expect(getPostType('[USA-FL] [H] CASH [W] Sony IER M9')).toBe('Buying');
		expect(getPostType('[USA-FL] [H] Cash [W] Sony IER M9')).toBe('Buying');
	});
	it('Gets the post type via $ being present in the [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] $300 [W] HD6XX')).toBe('Buying');
	});
	it('Gets the post type via [WTB] being present in the title.', () => {
		expect(getPostType('[wtb] Sony IER M9')).toBe('Buying');
		expect(getPostType('[WTB] Sony IER M9')).toBe('Buying');
		expect(getPostType('[Wtb] Sony IER M9')).toBe('Buying');
	});
	it('Gets the post type via [W] being present at the beginning of the title.', () => {
		expect(getPostType('[w][USA-MA] free or close to free r710')).toBe('Buying');
		expect(getPostType('[W][USA-MA] free or close to free r710')).toBe('Buying');
	});

	// Selling Tests
	it('Gets the post type via paypal being present in the [W] section of title.', () => {
		expect(getPostType('[USA-FL] [H] HD6XX [W] paypal')).toBe('Selling');
		expect(getPostType('[USA-FL] [H] HD6XX [W] PAYPAL')).toBe('Selling');
		expect(getPostType('[USA-FL] [H] HD6XX [W] Paypal')).toBe('Selling');
	});
	it('Gets the post type via cash being present in the [W] section of title.', () => {
		expect(getPostType('[USA-FL] [H] Sony IER M9 [W] cash')).toBe('Selling');
		expect(getPostType('[USA-FL] [H] Sony IER M9 [W] CASH')).toBe('Selling');
		expect(getPostType('[USA-FL] [H] Sony IER M9 [W] Cash')).toBe('Selling');
	});
	it('Gets the post type via $ being present in the [W] section of title.', () => {
		expect(getPostType('[USA-FL] [H] Scarlet Audio V2 [W] $450')).toBe('Selling');
	});
	it('Gets the post type via [FS] being present at the beginning of the title.', () => {
		expect(getPostType('[fs][US-IL] 4U File Server, Various Parts')).toBe('Selling');
		expect(getPostType('[Fs][US-IL] 4U File Server, Various Parts')).toBe('Selling');
		expect(getPostType('[FS][US-IL] 4U File Server, Various Parts')).toBe('Selling');
	});
	it('Gets the post type via [WTS] being present in the title.', () => {
		expect(getPostType('[USA-FL] [wts] Sony IER M9')).toBe('Selling');
		expect(getPostType('[USA-FL] [WTS] Sony IER M9')).toBe('Selling');
		expect(getPostType('[USA-FL] [WtS] Sony IER M9')).toBe('Selling');
	});

	// Trading Tests
	it('Gets the post type via paypal being present in both the [W] and [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] HD6XX, paypal [W] paypal, Scarlet Audio V2')).toBe('Trading');
		expect(getPostType('[USA-FL] [H] HD6XX, PAYPAL [W] PAYPAL, Scarlet Audio V2')).toBe('Trading');
		expect(getPostType('[USA-FL] [H] HD6XX, Paypal [W] payPAL, Scarlet Audio V2')).toBe('Trading');
	});
	it('Gets the post type via cash being present in both the [W] and [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] Sony IER M9, cash [W] cash, Scarlet Audio V2')).toBe('Trading');
		expect(getPostType('[USA-FL] [H] Sony IER M9, CASH [W] CASH, Scarlet Audio V2')).toBe('Trading');
		expect(getPostType('[USA-FL] [H] Sony IER M9, CaSh [W] cAsH, Scarlet Audio V2')).toBe('Trading');
	});
	it('Gets the post type via $ being present in both the [W] and [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] HD6XX, $250 [W] Scarlet Audio V3, $300')).toBe('Trading');
	});
	it('Gets the post type via different payment methods in both the [W] and [H] section of title.', () => {
		expect(getPostType('[USA-FL] [H] HD6XX, PayPAL [W] cash, Scarlet Audio V2')).toBe('Trading');
		expect(getPostType('[USA-FL] [H] HD6XX, Cash [W] Paypal, Scarlet Audio V2')).toBe('Trading');
	});

	// Giveaway Tests
	it('Gets the post type via [FREE] being present at the beginning of the title.', () => {
		expect(getPostType('[free] Fractal Node 804')).toBe('Giveaway');
		expect(getPostType('[FREE] Fractal Node 804')).toBe('Giveaway');
		expect(getPostType('[Free] Fractal Node 804')).toBe('Giveaway');
	});

	// Unknown default test
	it('Defaults post type to "Unknown" if it cannot determine post type.', () => {
		expect(getPostType('Poorly formatted reddit title')).toBe('Unknown');
	});
});
