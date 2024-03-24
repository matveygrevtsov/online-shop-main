import React from "react";
import { SignInForm } from "./components/SignInForm/";
import { UserAuthCredentials } from "../../types";
import { useAppDispatch } from "../../store";
import { userStoreActions } from "../../store/userSlice";
import { signInAsyncThunk } from "../../store/userSlice/asyncThunks/signInAsyncThunk";
import { useNotification } from "../../hooks/useNotification";

const { setLoading, setUserGuest } = userStoreActions;

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const handleSubmit = (userAuthCredentials: UserAuthCredentials) => {
    dispatch(setLoading());

    dispatch(signInAsyncThunk(userAuthCredentials))
      .unwrap()
      .catch((error: any) => {
        notification.error({
          message: "Не удалось войти в приложение",
          description: JSON.stringify(error),
        });
        dispatch(setUserGuest());
      });
  };

  return <SignInForm onSubmit={handleSubmit} />;
};
