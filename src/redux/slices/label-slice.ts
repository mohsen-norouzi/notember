import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabelEntity } from 'graphql/generated/graphql-types';

interface labelState {
  labels: LabelEntity[];
  show: boolean;
  filter: string;
}

const initialState: labelState = {
  labels: [],
  show: false,
  filter: ''
};

export const labelSlice = createSlice({
  name: 'label',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<LabelEntity[]>) => {
      state.labels = action.payload;
    },

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
