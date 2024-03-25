import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { UserAuthCredentials } from "../../../types";
import { AuthorizedUserData, userStoreActions } from "..";
import { dispatchCustomEvent } from "../../../hooks/useCustomEventsHandler";

const { setLoading, setUserData, logout } = userStoreActions;

export const signUpAsyncThunk = createAsyncThunk<void, UserAuthCredentials>(
  "user/signUp",
  async function ({ email, password }, thunkAPI) {
    thunkAPI.dispatch(setLoading());

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);

      const userData: AuthorizedUserData = {
        idsOfProductsInCart: [],
      };

      thunkAPI.dispatch(setUserData(userData));
    } catch (errorDescription: any) {
      thunkAPI.dispatch(logout());

      dispatchCustomEvent({
        type: "signUpError",
        errorDescription,
      });
    }
  }
);
