import PricingRuleInterface from "@/interface/PricingRuleInterface";
import ProductRepository from "./../repository/ProductRepository";

export class ThreeForTwoPricingRule implements PricingRuleInterface {

    apply(originalPrice: number, quantity: number): number {
        const setsOfThree = Math.floor(quantity / 3);
        const remainingItems = quantity % 3;
        return (setsOfThree * 2 + remainingItems) * originalPrice;
     }
}