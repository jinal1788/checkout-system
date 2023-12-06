import PricingRuleInterface from "@/interface/PricingRuleInterface";

// BulkDiscount Rule stretegy is mainly used for buying x quantity of item, item will be on special price
// for ex the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
export class BulkDiscountRule implements PricingRuleInterface {

    private threshold: number;
    private discountedPrice: number;

    constructor(threshold: number, discountedPrice: number) {
        if (threshold < 0 || discountedPrice < 0) {
            throw new Error("Threshold and discounted price must be non-negative values.");
        }
        this.threshold = threshold;
        this.discountedPrice = discountedPrice;
    }

    public apply(originalPrice: number, quantity: number): number {
        if (originalPrice < 0 || quantity < 0) {
                throw new Error("Original price and quantity must be non-negative values.");
        }
        
        return quantity > this.threshold ? quantity * this.discountedPrice : quantity * originalPrice;
    }
}