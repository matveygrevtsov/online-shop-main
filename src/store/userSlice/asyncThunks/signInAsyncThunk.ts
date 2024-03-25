import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { UserAuthCredentials } from "../../../types";
import { AuthorizedUserData, userStoreActions } from "..";
import { dispatchCustomEvent } from "../../../hooks/useCustomEventsHandler";

const { setLoading, setUserData, logout } = userStoreActions;

export const signInAsyncThunk = createAsyncThunk<void, UserAuthCredentials>(
  "user/signIn",
  async function ({ email, password }, thunkAPI) {
    thunkAPI.dispatch(setLoading());

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      const userData: AuthorizedUserData = {
        idsOfProductsInCart: [],
      };

      thunkAPI.dispatch(setUserData(userData));
    } catch (errorDescription: any) {
      thunkAPI.dispatch(logout());

      dispatchCustomEvent({
        type: "signInError",
        errorDescription,
      });
    }
  }
);
