import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "@/types/items";
import { Inventory } from "@/types/items";

export interface ItemState {
  selectedItem: Item | null;
  inventory: { [key: string]: Item };
}

const initialState: ItemState = {
  selectedItem: null,
  inventory: {},
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
    },
    setInventory: (state, action: PayloadAction<Inventory>) => {
      action.payload.forEach(({ key, value }) => {
        state.inventory[key] = value;
      });
    },
    spendCoin: (state, action: PayloadAction<{ quantityDelta: number }>) => {
      if (state.selectedItem) {
        state.selectedItem.quantity--;
      }
    },
  },
});

export const { setSelectedItem, setInventory, spendCoin } = itemSlice.actions;

export default itemSlice;
