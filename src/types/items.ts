interface BaseItem {
  name: string;
  description: string;
  quantity: number;
}

export interface CoinBag extends BaseItem {
  isMasterKey: boolean;
}
export interface MasterKey extends BaseItem {
  isMasterKey: boolean;
}
export type Item = CoinBag | MasterKey;

export type Inventory = Array<{ key: string; value: any }>