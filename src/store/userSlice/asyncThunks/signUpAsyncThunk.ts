import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { UserAuthCredentials } from "../../../types";

export const signUpAsyncThunk = createAsyncThunk<void, UserAuthCredentials>(
  "user/signUp",
  async function ({ email, password }, thunkAPI) {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
