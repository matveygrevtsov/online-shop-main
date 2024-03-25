import { useEffect } from "react";
import { ELocalStorageKey } from "../types";
import { useAppDispatch } from "../store";
import { AuthorizedUserDataSchema, userStoreActions } from "../store/userSlice";

const { setUserData, logout } = userStoreActions;

export const useUserDataFromLocalStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUserDataInLocalStorage = () => {
      const userDataFromLocalStorage = window.localStorage.getItem(
        ELocalStorageKey.UserData
      );

      if (!userDataFromLocalStorage) {
        dispatch(logout());
        return;
      }

      const parse = AuthorizedUserDataSchema.safeParse(
        JSON.parse(userDataFromLocalStorage)
      );

      if (parse.success) {
        dispatch(setUserData(parse.data));
      } else {
        dispatch(logout());
      }
    };

    const handleLocalStorageChange = (event: StorageEvent) => {
      if (
        event.key !== ELocalStorageKey.UserData ||
        event.oldValue === event.newValue
      ) {
        return;
      }

      checkUserDataInLocalStorage();
    };

    window.addEventListener("storage", handleLocalStorageChange);

    checkUserDataInLocalStorage();

    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, [dispatch]);
};
