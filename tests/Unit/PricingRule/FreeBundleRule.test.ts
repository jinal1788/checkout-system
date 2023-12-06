import {FreeBundleRule} from '../../../src/PricingRule/FreeBundleRule';
import 'jest';

describe('PricingRule/FreeBundleRule', () => {
    let freeBundleRule: FreeBundleRule;
    const items: Map<string, number> = new Map();

    beforeEach(async () => {
        freeBundleRule = new FreeBundleRule('vga', 1);
    });

    test('when buy 1 macbook pro, eligible for 1 free vga adapter', async () => {
        items.set('mbp', 1);
        items.set('vga', 2);
        freeBundleRule.setItemQuantities(items);
        freeBundleRule.setItem('mbp');
        const appliedRuleAmount = freeBundleRule.apply(500, 1);
        expect(appliedRuleAmount).toBe(500);
        expect(freeBundleRule.getFreeItem()).toBe('vga');
        expect(freeBundleRule.getFreeItemQuantity()).toBe(1);
        expect(freeBundleRule.getItem()).toBe('mbp');
        expect(items.get('vga')).toBe(1);
    });

    test('when buy 2 macbook pro product and 3 VGA adapters in cart then eligible for 2 free vga adapter', async () => {
        items.set('mbp', 2);
        items.set('vga', 3);
        freeBundleRule.setItemQuantities(items);
        freeBundleRule.setItem('mbp');
        const appliedRuleAmount = freeBundleRule.apply(500, 2);
        expect(appliedRuleAmount).toBe(1000);
        expect(freeBundleRule.getFreeItem()).toBe('vga');
        expect(freeBundleRule.getFreeItemQuantity()).toBe(2);
        expect(freeBundleRule.getItem()).toBe('mbp');
        expect(items.get('vga')).toBe(1);
    });

    test('when buy 3 macbook pro product and 2 VGA adapters in cart then eligible for 3 free vga adapter', async () => {
        items.set('mbp', 3);
        items.set('vga', 2);
        freeBundleRule.setItemQuantities(items);
        freeBundleRule.setItem('mbp');
        const appliedRuleAmount = freeBundleRule.apply(500, 3);
        expect(appliedRuleAmount).toBe(1500);
        expect(freeBundleRule.getFreeItem()).toBe('vga');
        expect(freeBundleRule.getFreeItemQuantity()).toBe(3);
        expect(freeBundleRule.getItem()).toBe('mbp');
        expect(items.get('vga')).toBe(0);
    });

    test('when item is not set, it should throw error', () => {
        items.set('mbp', 1);
        items.set('vga', 1);
        freeBundleRule.setItemQuantities(items);
        const appliedRuleAmount = () => freeBundleRule.apply(500, 3);
        expect(appliedRuleAmount).toThrowError('FreeBundleRule not properly initialized. Set item before calculating free bundle rule.');
    })
});