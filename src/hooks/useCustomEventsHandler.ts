import { useEffect } from "react";
import { useNotification } from "./useNotification";

const CUSTOM_EVENT_NAME = "customEvent";

interface SignUpErrorCustomEvent {
  type: "signUpError";
  errorDescription: any;
}

interface SignInErrorCustomEvent {
  type: "signInError";
  errorDescription: any;
}

type CustomEvent = SignUpErrorCustomEvent | SignInErrorCustomEvent;

export const dispatchCustomEvent = (detail: CustomEvent) => {
  const event = new CustomEvent(CUSTOM_EVENT_NAME, {
    detail,
  });

  window.dispatchEvent(event);
};

export const useCustomEventsHandler = () => {
  const notification = useNotification();

  useEffect(() => {
    const handleCustomEvent = (customEvent: any) => {
      const event = customEvent?.detail as CustomEvent;

      switch (event.type) {
        case "signUpError": {
          notification.error({
            message: "Не удалось зарегистрироваться",
            description: JSON.stringify(event.errorDescription),
          });
          return;
        }

        case "signInError": {
          notification.error({
            message: "Не удалось войти",
            description: JSON.stringify(event.errorDescription),
          });
          return;
        }
      }
    };

    window.addEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);

    return () => {
      window.removeEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);
    };
  }, [notification]);
};
