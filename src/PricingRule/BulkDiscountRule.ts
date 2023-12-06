import PricingRuleInterface from "@/interface/PricingRuleInterface";

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