import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import filterSlice from "./features/filter/filterSlice";
import taskSlice from "./features/task/taskSlice";

const store = configureStore({
  reducer: {
    task: taskSlice,
    filter: filterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
