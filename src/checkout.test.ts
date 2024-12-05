import Checkout from "./checkout";
import { appleTVDeal, superIPadBulkDiscount } from "./pricingRule";

const prices = {
  ipd: 549.99, //Super iPad
  mbp: 1399.99, //Macbook Pro
  atv: 109.50, //Apple TV
  vga: 30.0, //VGA adapter
};

function assertEqual(actual: number, expected: number, testName: string): void {
  if (actual === expected) {
    console.log(`${testName}: Passed`);
  } else {
    console.error(`${testName}: Expected = ${expected}, Result = ${actual}`);
  }
}

function runTests() {
  console.log("Test run has started");

  const co1 = new Checkout([appleTVDeal], prices);
  co1.scan("atv");
  co1.scan("atv");
  co1.scan("atv");
  co1.scan("vga");
  assertEqual(co1.total(), 249.0, "Apple TV 3-for-2 deal + VGA");

  const co2 = new Checkout([superIPadBulkDiscount], prices);
  co2.scan("ipd");
  co2.scan("ipd");
  co2.scan("ipd");
  co2.scan("ipd");
  co2.scan("ipd");
  assertEqual(co2.total(), 2499.95, "Super iPad bulk discount for 5 units");

  const co3 = new Checkout([appleTVDeal, superIPadBulkDiscount], prices);
  co3.scan("atv");
  co3.scan("ipd");
  co3.scan("ipd");
  co3.scan("atv");
  co3.scan("ipd");
  co3.scan("ipd");
  co3.scan("ipd");
  assertEqual(co3.total(), 2718.95, "Combined pricing rules for Apple TV and Super iPad");

  console.log("Tests completed.");
}

runTests();
