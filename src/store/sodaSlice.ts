import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Soda } from "@/types/soda";
import { useCallback } from "react";

export interface SodaState {
  selectedSoda: Soda | null;
  sodaList: Soda[];
}

const initialState: SodaState = {
  selectedSoda: null,
  sodaList: [],
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const sodaSlice = createSlice({
  name: "soda",
  initialState,
  reducers: {
    setSoda: (state, action: PayloadAction<Soda>) => {
      state.selectedSoda = action.payload;
    },
    setSodaList: (state, action: PayloadAction<Soda[]>) => {
      const updatedSodaList = action.payload.map((soda) => {
        return { ...soda, randomColor: getRandomColor() };
      });
      state.sodaList = updatedSodaList;
    },
  },
});

export const { setSoda, setSodaList } = sodaSlice.actions;

export default sodaSlice;
