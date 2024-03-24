import React from "react";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
interface HeaderProps {
    items: ItemType<MenuItemType>[];
    onLogout: (() => void) | undefined;
}
declare const Header: ({ items, onLogout }: HeaderProps) => React.JSX.Element;
export default Header;
