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

//First example
// co.scan("atv");
// co.scan("vga");
// co.scan("atv");
// co.scan("atv");


// Second Example
// co.scan("atv");
// co.scan("ipd");
// co.scan("ipd");
// co.scan("atv");
// co.scan("ipd");
// co.scan("ipd");
// co.scan("ipd");


//Third example
co.scan("mbp");
co.scan("ipd");
co.scan("vga");
//co.scan("vga");

const total = co.total();
console.log(`Total amount: $${total}`);