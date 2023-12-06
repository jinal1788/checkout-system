export default interface PricingRuleInterface {
    apply(originalPrice: number, quantity: number): number;
}