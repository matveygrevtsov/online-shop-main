import React from "react";
import { SignInForm } from "./components/SignInForm/";
import { UserAuthCredentials } from "../../types";
import { useAppDispatch } from "../../store";
import { userStoreActions } from "../../store/userSlice";
import { signInAsyncThunk } from "../../store/userSlice/asyncThunks/signInAsyncThunk";
import { useNotification } from "../../hooks/useNotification";

const { setLoading, setUserData, logout } = userStoreActions;

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const handleSubmit = (userAuthCredentials: UserAuthCredentials) => {
    dispatch(setLoading());

    dispatch(signInAsyncThunk(userAuthCredentials))
      .unwrap()
      .then(
        () => {
          dispatch(
            setUserData({
              idsOfProductsInCart: [],
            })
          );
        },
        (error: any) => {
          notification.error({
            message: "Не удалось войти в приложение",
            description: JSON.stringify(error),
          });
          dispatch(logout());
        }
      );
  };

  return <SignInForm onSubmit={handleSubmit} />;
};
