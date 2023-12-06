import PricingRuleInterface from "@/interface/PricingRuleInterface";
import ProductRepository from "./../repository/ProductRepository";

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