import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface noteState {
  showNoteForm: boolean;
}

const initialState: noteState = {
  showNoteForm: false
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    showForm: (state) => {
      state.showNoteForm = true;
    },

    hideForm: (state) => {
      state.showNoteForm = false;
    }
  }
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
