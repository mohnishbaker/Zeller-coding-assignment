// checkout.ts
import { PricingRule } from "./types";

class Checkout {
  private scannedItems: Record<string, number> = {};
  private pricingRules: PricingRule[];
  private prices: Record<string, number>;

  constructor(pricingRules: PricingRule[], prices: Record<string, number>) {
    this.pricingRules = pricingRules;
    this.prices = prices;
  }

  scan(sku: string): void {
    this.scannedItems[sku] = (this.scannedItems[sku] || 0) + 1;
  }

  total(): number {
    let total = 0;
    const itemsCopy = { ...this.scannedItems };

    this.pricingRules.forEach((rule) => {
      total += rule(itemsCopy, this.prices);
    });

    for (const sku in itemsCopy) {
      const remainingCount = itemsCopy[sku] || 0;
      if (remainingCount > 0) {
        total += remainingCount * (this.prices[sku] || 0);
      }
    }
    return parseFloat(total.toFixed(2)); 
  }
}

export default Checkout;
