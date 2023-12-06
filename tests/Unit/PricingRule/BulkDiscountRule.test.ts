
import {BulkDiscountRule} from '../../../src/PricingRule/BulkDiscountRule';
import 'jest';

describe('PricingRule/BulkDiscount', () => {

    const BULK_DISCOUNT_QTY = 3;
    const DISCOUNTED_PRICE = 500;

    let bulkDiscountRule: BulkDiscountRule;
    beforeEach(async () => {
        bulkDiscountRule = new BulkDiscountRule(BULK_DISCOUNT_QTY, DISCOUNTED_PRICE);
    })

    test('bulk discount applied if item is more than 3', async () => {
        const appliedRuleAmount = bulkDiscountRule.apply(9999.99, 5);
        expect(appliedRuleAmount).toBe(2500);
    });

    test('bulk discount not applied if item is less than 3', async () => {
        const appliedRuleAmount = bulkDiscountRule.apply(9999.99, 2);
        expect(appliedRuleAmount).toBe(19999.98);
    })

    test('bulk discount not applied if item is 3', async () => {
        const appliedRuleAmount = bulkDiscountRule.apply(9999.99, 3);
        expect(appliedRuleAmount).toBe(29999.97);
    })

    test('when bulk discount threshold less than zero, it should throw error', async () => {
        const bulkDiscountObj = () => new BulkDiscountRule(-344, -34);
        expect(bulkDiscountObj).toThrowError('Threshold and discounted price must be non-negative values.');
    });

    test('when original price is less than zero and qty is less than zero, it should throw error', async () => {
        const appliedRuleAmount = () => bulkDiscountRule.apply(-9999.99, -3);
        expect(appliedRuleAmount).toThrowError('Original price and quantity must be non-negative values.');
    })
})