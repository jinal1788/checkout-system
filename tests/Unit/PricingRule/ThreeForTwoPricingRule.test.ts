import {ThreeForTwoPricingRule} from '../../../src/PricingRule/ThreeForTwoPricingRule';
import 'jest';

describe('PricingRule/ThreeForTwoPricingRule', () => {
    let threeForTwoPricingRule: ThreeForTwoPricingRule;

    beforeEach(async () => {
        threeForTwoPricingRule = new ThreeForTwoPricingRule();
    });

    test('when we buy 3 items, we need to pay for 2 items', async () => {
        const appliedRuleAmount = threeForTwoPricingRule.apply(500, 3);
        expect(appliedRuleAmount).toBe(1000);
        
    });

    test('when we buy 4 items, we need to pay for 3 items', async () => {
        const appliedRuleAmount = threeForTwoPricingRule.apply(500, 4);
        expect(appliedRuleAmount).toBe(1500);
        
    });

    test('when we buy 2 items, we need to pay for 2 items', async () => {
        const appliedRuleAmount = threeForTwoPricingRule.apply(500, 3);
        expect(appliedRuleAmount).toBe(1000);
        
    });
});