
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
})