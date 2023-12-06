import 'jest';
import Checkout from '../../src/Checkout';
import {ThreeForTwoPricingRule} from '../../src/PricingRule/ThreeForTwoPricingRule';
import {BulkDiscountRule} from '../../src/PricingRule/BulkDiscountRule';
import {FreeBundleRule} from '../../src/PricingRule/FreeBundleRule';
import ProductRepository from '../../src/repository/ProductRepository';

describe('Checkout', () => {
   
    let checkout: Checkout;

   const productRepoMock = {
        getProductPrice: jest.fn().mockImplementation((product) => {
            if (product === "abc") {
                return 100;
            } else if (product === 'def') {
                return 50;
            } else if (product === 'ghi') {
                return 600;
            } else if (product === 'test'){
                return 1000;
            } else {
                return 0;
            }
        }),
   };

    beforeEach(async () => {
        checkout = new Checkout(productRepoMock);

        // Adding Pricing Rules
        checkout.setPricingStrategy('abc', new ThreeForTwoPricingRule());
        checkout.setPricingStrategy('def', new BulkDiscountRule(2, 20));
        checkout.setPricingStrategy('ghi', new FreeBundleRule('test', 1));
    })

    test('when we buy 3 abc products then we should pay for only 2 abc items(Three for Two Pricing Rule)', async () => {
        checkout.scan('abc');
        checkout.scan('abc');
        checkout.scan('abc');
        checkout.scan('abc');
        checkout.scan('def');
        expect(checkout.total()).toBe(350);
    })

    test('when we buy 2 ghi product, we should get two test products free and only get charged for 1 test product', async () => {
        checkout.scan('ghi');
        checkout.scan('ghi');
        checkout.scan('test');
        checkout.scan('test');
        checkout.scan('test');
        expect(checkout.total()).toBe(2200);
    });

    test('when we buy 3 ghi product, we should get three test products free', async () => {
        checkout.scan('ghi');
        checkout.scan('ghi');
        checkout.scan('ghi');
        checkout.scan('test');
        checkout.scan('test');
        expect(checkout.total()).toBe(1800);
    });

    test('when we buy 1 ghi product, we should get one test products free and get charge for other two test product', async () => {
        checkout.scan('ghi');
        checkout.scan('test');
        checkout.scan('test');
        checkout.scan('test');
        expect(checkout.total()).toBe(2600);
    });

    test('when we buy more than 2 def product then price will be $20 for def product', async () => {
        checkout.scan('def');
        checkout.scan('def');
        checkout.scan('def');
        checkout.scan('def');
        expect(checkout.total()).toBe(80);
    });

    test('when we buy less than 2 def product then price will be $100 for def product', async () => {
        checkout.scan('def');
        checkout.scan('abc');
        checkout.scan('erfsss');
        expect(checkout.total()).toBe(150);
    })

    test('when two rules Bulk discount rule & Three for Two bundle Rule are eligible then those rules should apply', async () => {
        checkout.scan('def');
        checkout.scan('def');
        checkout.scan('abc');
        checkout.scan('abc');
        checkout.scan('abc');
        checkout.scan('def');
        expect(checkout.total()).toBe(260);
    })

    test('when three rules Bulk discount rule & Three for Two bundle Rule & Free Bundle Rule then those three rules should apply', async () => {
        checkout.scan('ghi');
        checkout.scan('ghi');
        checkout.scan('ghi');
        expect(checkout.total()).toBe(1800);
    })

    test('when two rules Three for Two bundle Rule & Free Bundle Rule is eligible then those two rules should apply', async () => {
        checkout.scan('ghi');
        checkout.scan('ghi');
        checkout.scan('test');
        checkout.scan('test');
        checkout.scan('abc');
        checkout.scan('abc');
        checkout.scan('abc');
        expect(checkout.total()).toBe(1400);
    })

    test('when two rules Bulk discount rule & Free Bundle Rule is eligible then those those two rules should apply', async () => {
        checkout.scan('def');
        checkout.scan('def');
        checkout.scan('def');
        checkout.scan('ghi');
        expect(checkout.total()).toBe(660);
    })

    test('Default Rule apply(No Stretegy apply)', async () => {
        checkout.scan('test');
        expect(checkout.total()).toBe(1000);
    })

    test('Sku is not exist)', async () => {
        checkout.scan('testtttt');
        expect(checkout.total()).toBe(0);
    })
});
