import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteEntity } from 'graphql/generated/graphql-types';

interface noteState {
  showNoteForm: boolean;
  notes: NoteEntity[];
}

const initialState: noteState = {
  showNoteForm: false,
  notes: []
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<NoteEntity[]>) => {
      state.notes = action.payload;
    },

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
