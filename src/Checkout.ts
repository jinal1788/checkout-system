import PricingRuleInterface from "./interface/PricingRuleInterface";
import {FreeBundleRule} from "./PricingRule/FreeBundleRule";
import ProductRepository from "./repository/ProductRepository";

 export default class Checkout {
    private itemQuantities: Map<string, number> = new Map();
    private pricingRules: Map<string, PricingRuleInterface> = new Map();
    private productRepo: ProductRepository;

    constructor(productRepo: ProductRepository) {
        this.productRepo = productRepo;
    }
     
    setPricingStrategy(item: string, strategy: PricingRuleInterface): void {
        this.pricingRules.set(item, strategy);
    } 
     
    getItemQuantity(item:string):number {
         return this.itemQuantities.get(item);
    }

    scan(item:string): void {
        this.itemQuantities.set(item, (this.getItemQuantity(item) || 0) + 1);
    }

    total(): number {
        let totalAmount: number = 0;

        for (const [item, quantity] of this.itemQuantities.entries()) {
            try {
                const itemPrice: number = this.productRepo.getProductPrice(item) || 0;
                const pricingStrategy: PricingRuleInterface | undefined = this.pricingRules.get(item);
            
                if (pricingStrategy) {
                    if (pricingStrategy instanceof FreeBundleRule) {
                        pricingStrategy.setItemQuantities(this.itemQuantities);
                        pricingStrategy.setItem(item);
                    }
                    totalAmount += pricingStrategy.apply(itemPrice, quantity);
                } else {
                    totalAmount += itemPrice * quantity;
                }
            } catch (error) {
                // Log error and continue with next item in loop
                console.error(`Error processing item "${item}": ${error.message}`);
            }
            
        }
        return Number(totalAmount.toFixed(2));
    }
}