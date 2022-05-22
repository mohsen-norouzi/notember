import { createSlice } from '@reduxjs/toolkit';

interface labelState {
  show: boolean;
}

const initialState: labelState = {
  show: false
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
    }
  }
});

export const labelActions = labelSlice.actions;

export default labelSlice.reducer;
