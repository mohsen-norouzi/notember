import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface labelState {
  show: boolean;
  filter: string;
}

const initialState: labelState = {
  show: false,
  filter: ''
};

export const labelSlice = createSlice({
  name: 'label',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleShowLabels: (state) => {
      state.show = !state.show;
    },

    showLabels: (state) => {
      state.show = true;
    },

    hideLabels: (state) => {
      state.show = false;
    },

    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    }
  }
});

export const labelActions = labelSlice.actions;

export default labelSlice.reducer;
