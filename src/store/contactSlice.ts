import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Status enum with two values: active and inactive
export enum Status {
  Active = "active",
  Inactive = "inactive",
}

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: Status;
}

const initialState: Contact[] = [];

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // Add a new contact
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    // Update an existing contact by ID
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.findIndex(
        (contact) => contact.id === action.payload.id
      );

      if (index !== -1) state[index] = action.payload;
    },
    // Remove a contact by ID
    removeContact: (state, action: PayloadAction<number>) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, removeContact } =
  contactSlice.actions;
export default contactSlice.reducer;
