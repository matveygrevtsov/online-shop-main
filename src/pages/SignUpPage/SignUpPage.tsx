import React from "react";
import { SignUpForm } from "./components/SignUpForm/";
import { useAppDispatch } from "../../store";
import { UserAuthCredentials } from "../../types";
import { userStoreActions } from "../../store/userSlice";
import { signUpAsyncThunk } from "../../store/userSlice/asyncThunks/signUpAsyncThunk";
import { useNotification } from "../../hooks/useNotification";

const { setLoading, setUserGuest } = userStoreActions;

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const handleSubmit = (userAuthCredentials: UserAuthCredentials) => {
    dispatch(setLoading());

    dispatch(signUpAsyncThunk(userAuthCredentials))
      .unwrap()
      .catch((error: any) => {
        notification.error({
          message: "Не удалось зарегистрироваться",
          description: JSON.stringify(error),
        });
        dispatch(setUserGuest());
      });
  };

  return <SignUpForm onSubmit={handleSubmit} />;
};
