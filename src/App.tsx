import React, { createContext } from "react";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import { NotificationInstance } from "antd/es/notification/interface";
import useNotification from "antd/es/notification/useNotification";
import { Routes } from "./components/Routes";

export const NotificationContext = createContext<NotificationInstance>(
  {} as NotificationInstance
);

export const App = (): JSX.Element => {
  const [notification, notificationContext] = useNotification();

  return (
    <Provider store={store}>
      <NotificationContext.Provider value={notification}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </NotificationContext.Provider>

      {notificationContext}
    </Provider>
  );
};
