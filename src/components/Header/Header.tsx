import React, { Suspense, useMemo, lazy } from "react";
import HeaderType from "header/compiled-types/Header";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  UserAddOutlined,
  LoginOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";
import { RoutePath } from "../../types";
import { userStoreActions } from "../../store/userSlice";

// @ts-ignore
const RemoteHeader = lazy<typeof HeaderType>(() => import("header/Header"));

type Items = ItemType<MenuItemType>[];

const { logout } = userStoreActions;

export const Header = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((store) => store.user);

  const items = useMemo<Items>(() => {
    switch (userData.status) {
      case "success": {
        const items: Items = [
          {
            label: "ONLINE-SHOP",
            key: RoutePath.Main,
            icon: <ShoppingOutlined />,
          },
          {
            label: "Корзина",
            key: RoutePath.Cart,
            icon: (
              <Badge count={5} size="small">
                <ShoppingCartOutlined />
              </Badge>
            ),
          },
        ];

        return items;
      }

      case "guest": {
        const items: Items = [
          {
            label: "Зарегистрироваться",
            key: RoutePath.SingUp,
            icon: <UserAddOutlined />,
          },
          {
            label: "Войти",
            key: RoutePath.SingIn,
            icon: <LoginOutlined />,
          },
        ];

        return items;
      }

      case "loading": {
        return [];
      }
    }
  }, [userData]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AntdHeader>
      <Suspense>
        <RemoteHeader
          items={items}
          onLogout={userData.status === "success" ? handleLogout : undefined}
        />
      </Suspense>
    </AntdHeader>
  );
};
