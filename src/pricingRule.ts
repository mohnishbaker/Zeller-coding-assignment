import { PricingRule } from "./types";

// Discount Rule for Apple TV Deal
export const appleTVDeal: PricingRule = (items, prices) => {
  const count = items["atv"] || 0;
  if (count === 0) return 0;
  const eligibleForDiscount = Math.floor(count / 3);
  const remaining = count % 3;
  items["atv"] = 0;
  const finalResult = (eligibleForDiscount * 2 + remaining) * prices["atv"];
  return finalResult;
};

// Discount rule for Super Ipad Bulk Discount
export const superIPadBulkDiscount: PricingRule = (items, prices) => {
  const count = items["ipd"] || 0;
  if (count === 0) return 0;    
  const discountedPrice = count > 4 ? 499.99 : prices["ipd"];
  items["ipd"] = 0;

  return count * discountedPrice;
};
