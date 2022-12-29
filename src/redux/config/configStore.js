import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "../modules/boardSlice";
import commentSlice from "../modules/commentSlice";

const store = configureStore({
  reducer: { boardSlice, commentSlice },
});

export default store;
