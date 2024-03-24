import { useEffect } from "react";
import { ELocalStorageKey } from "../types";
import { useAppDispatch } from "../store";
import { AuthorizedUserDataSchema, userStoreActions } from "../store/userSlice";

const { setUserData, setUserGuest } = userStoreActions;

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUserDataInLocalStorage = () => {
      const userDataFromLocalStorage = window.localStorage.getItem(
        ELocalStorageKey.UserData
      );

      if (!userDataFromLocalStorage) {
        dispatch(setUserGuest());
        return;
      }

      const parse = AuthorizedUserDataSchema.safeParse(
        JSON.parse(userDataFromLocalStorage)
      );

      if (parse.success) {
        dispatch(setUserData(parse.data));
      } else {
        dispatch(setUserGuest());
      }
    };

    const handleLocalStorageChange = (event: StorageEvent) => {
      alert(1)

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
