import PricingRuleInterface from "@/interface/PricingRuleInterface";

export class FreeBundleRule implements PricingRuleInterface {

    private itemQuantities: Map<string, number>;
    private item: string;

    constructor(private freeItem: string, private freeItemQty: number) {
        this.freeItem = freeItem;
        this.freeItemQty = freeItemQty;
    }

    apply(originalPrice: number, quantity: number): number {
        if (this.itemQuantities) {
            this.calculateFreeBundleRuleFromTotal();
        }
        return originalPrice * quantity;
    }

    getFreeItem(): string {
        return this.freeItem;
    }

    setItemQuantities(itemQuantities: Map<string, number>): void {
        this.itemQuantities = itemQuantities;
    }

    setItem(item: string) {
        this.item = item;
    }

    getItem(): string {
        return this.item;
    }

    getFreeItemQuantity(): number {
        return this.freeItemQty * this.itemQuantities.get(this.getItem()); // Quantity of the free item (VGA Adapter) to be added
    }

    getItemQuantity(item: string): number {
        console.log('getItemQuantitygetItemQuantity', this.itemQuantities.get('mbp'));
         return this.itemQuantities.get(item);
    }

    private calculateFreeBundleRuleFromTotal() {
        const freeItemQuantity = this.getFreeItemQuantity();
        const freeItem = this.getFreeItem();

        const currentFreeQuantity = this.itemQuantities.get(freeItem) || 0;
       
        // Calculate the updated quantity with only pay for extra VGA adpater
        const updatedFreeQantity = Math.max(currentFreeQuantity, freeItemQuantity);
        this.itemQuantities.set(freeItem, updatedFreeQantity);

        console.log(`You will get ${freeItemQuantity} free ${freeItem} with ${this.getItemQuantity(this.getItem())} ${this.getItem()} purchase`);
        
        // for ex. if you buy 2 mac pro then eligible for 2 free vga adapters but if you have 3 vga adapters in  your cart then pay for 1 vga adapter
        this.itemQuantities.set(freeItem, Math.max(0, this.itemQuantities.get(freeItem) - freeItemQuantity));
     }
}