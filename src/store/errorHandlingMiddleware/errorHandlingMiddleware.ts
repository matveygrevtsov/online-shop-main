import { Middleware, MiddlewareAPI, isRejected } from "@reduxjs/toolkit";
import { userStoreActions } from "../userSlice";

const { logout } = userStoreActions;

export const errorHandlingMiddleware: Middleware =
  (middlewareAPI: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejected(action) && action?.payload?.status === 401) {
      middlewareAPI.dispatch(logout());
    }

    return next(action);
  };
