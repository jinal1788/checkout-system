import Checkout from './Checkout';
import {BulkDiscountRule} from './PricingRule/BulkDiscountRule';
import {FreeBundleRule} from './PricingRule/FreeBundleRule';
import {ThreeForTwoPricingRule} from './PricingRule/ThreeForTwoPricingRule';
import ProductRepository from './repository/ProductRepository';


// create application instance
let instance = null;

const co = new Checkout(new ProductRepository());
co.setPricingStrategy('atv', new ThreeForTwoPricingRule());
co.setPricingStrategy('ipd', new BulkDiscountRule(4, 499.99));
co.setPricingStrategy('mbp', new FreeBundleRule('vga', 1));

const args = process.argv.slice(2);

if (args.length > 0) {
    if (args[0] == 'FirstExample') {
        co.scan("atv");
        co.scan("vga");
        co.scan("atv");
        co.scan("atv");
    } else if (args[0] == 'SecondExample') {
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("atv");
        co.scan("ipd");
        co.scan("ipd");
        co.scan("ipd");
    } else {
        co.scan("mbp");
        co.scan("ipd");
        co.scan("vga");
    }
}

const total = co.total();
console.log(`Total amount: $${total}`);