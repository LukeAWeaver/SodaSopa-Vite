import { configureStore } from "@reduxjs/toolkit";
import itemSlice, { ItemState } from "./itemSlice";
import sodaSlice, { SodaState } from "./sodaSlice";
import userSlice, { UserState } from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    item: itemSlice.reducer,
    soda: sodaSlice.reducer,
  },
});

export type RootState = {
  user: UserState;
  item: ItemState;
  soda: SodaState;
};

export default store;
