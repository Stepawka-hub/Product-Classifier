import { addToast } from "@slices/toasts";
import { AppThunkDispatch } from "@thunks/types/types";

export const dispatchSuccessToast = (
  dispatch: AppThunkDispatch,
  message: string
) => {
  dispatch(
    addToast({
      message,
      type: "success",
      duration: 2500,
    })
  );
};

export const dispatchErrorToast = (
  dispatch: AppThunkDispatch,
  message: string
) => {
  dispatch(
    addToast({
      message,
      type: "error",
      duration: 3000,
    })
  );
};
