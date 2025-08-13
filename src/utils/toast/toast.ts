import toast from "react-hot-toast";
import type { ToastOptions } from "react-hot-toast";

const baseStyle: ToastOptions["style"] = {
  padding: "10px",
  color: "#FFFFFF",
};

//・・・・・・・・・・・・・・・ Success Toast ・・・・・・・・・・・・・・・

export const toastSuccess = (message: string) =>
  toast.success(message, {
    style: {
      ...baseStyle,
      backgroundColor: "#06923E",
    },
    iconTheme: {
      primary: "#FFFCFB",
      secondary: "#06923E",
    },
  });

//・・・・・・・・・・・・・・・ Error Toast ・・・・・・・・・・・・・・・

export const toastError = (message: string) =>
  toast.error(message, {
    style: {
      ...baseStyle,
      backgroundColor: "#DC2525",
    },
    iconTheme: {
      primary: "#FFFCFB",
      secondary: "#DC2525",
    },
  });

//・・・・・・・・・・・・・・・ Promise Toast ・・・・・・・・・・・・・・・

export const toastPromise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  }
): Promise<T> =>
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
