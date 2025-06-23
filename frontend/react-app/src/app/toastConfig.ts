import type { ToastPosition } from "react-hot-toast";

export interface ToastConfig {
  toast: {
    position: ToastPosition;
    duration: number;
  };
}
