import { MasterKey, CoinBag } from "@/types/items";

export function createMasterKey(quantity: number): MasterKey {
  return {
    name: "The Master Key",
    description:
      "The key is incredibly brittle and appears to be on the verge of crumbling to dust.",
    isMasterKey: true,
    quantity,
  };
}
export function createCoinBag(quantity: number): CoinBag {
  return {
    name: "Coin Bag",
    description: "Each with the value of a single beverage",
    isMasterKey: false,
    quantity,
  };
}
