import PricingRuleInterface from "@/interface/PricingRuleInterface";

export class BulkDiscountRule implements PricingRuleInterface {

    private threshold: number;
    private discountedPrice: number;

    constructor(threshold: number, discountedPrice: number) {
        this.threshold = threshold;
        this.discountedPrice = discountedPrice;
    }

    public apply(originalPrice: number, quantity: number): number {
        return quantity > this.threshold ? quantity * this.discountedPrice : quantity * originalPrice;
    }
}