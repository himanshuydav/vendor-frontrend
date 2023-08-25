import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { itemDropDown, vendorDropDown } from "../../utils/services";


export const fetchDropDown = createAsyncThunk(
  "contractfrom/dropdown",
  async () => {
    try {
      const result = await itemDropDown();
      return result.res;
    } catch (error) {
      toast.error(error.message);
    }
  }
 );

 export const fetchVendorlist = createAsyncThunk(
  "contractfrom/vendorlist",
  async () => {
    try {
      const result = await vendorDropDown();
      return result.res;
    } catch (error) {
      toast.error(error.message);
    }
  }
 );


const contractFromSlice = createSlice({
  name: "contractfrom",
  initialState: {
    loading: false,
    dropdownItems: [],
    dropdownVendor: [],
  },
  extraReducers: {
    [fetchDropDown.pending]: (state) => {
      state.loading = true;
    },
    [fetchDropDown.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dropdownItems = payload;
    },
    [fetchDropDown.rejected]: (state) => {
      state.loading = false;
    },
    [fetchVendorlist.pending]: (state) => {
      state.loading = true;
    },
    [fetchVendorlist.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dropdownVendor = payload;
    },
    [fetchVendorlist.rejected]: (state) => {
      state.loading = false;
    },
  },
});


export default contractFromSlice.reducer;