import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { UserAuthCredentials } from "../../../types";

export const signInAsyncThunk = createAsyncThunk<void, UserAuthCredentials>(
  "user/signIn",
  async function ({ email, password }, thunkAPI) {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
