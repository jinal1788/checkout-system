import PricingRuleInterface from "@/interface/PricingRuleInterface";
import ProductRepository from "./../repository/ProductRepository";

// ThreeForTwoPricingRule stretegy is mainly used for buying 3 quantity of x item, you will pay for 2 quantity of x item
// For ex. we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
export class ThreeForTwoPricingRule implements PricingRuleInterface {

    apply(originalPrice: number, quantity: number): number {
        if (quantity < 0) {
            throw new Error("Quantity must be a non-negative value.");
        }

        const setsOfThree = Math.floor(quantity / 3);
        const remainingItems = quantity % 3;
        return (setsOfThree * 2 + remainingItems) * originalPrice;
     }
}