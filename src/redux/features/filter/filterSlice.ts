import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterState {
  searchText: string;
  categoryFilter: string | null;
  sortDirection: string;
}

const initialState: IFilterState = {
  searchText: "",
  categoryFilter: null,
  sortDirection: "desc",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.categoryFilter = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<string>) => {
      state.sortDirection = action.payload;
    },
  },
});

export const { setSearchText, setCategoryFilter, setSortDirection } =
  filterSlice.actions;

export default filterSlice.reducer;