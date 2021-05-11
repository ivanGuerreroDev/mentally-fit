import {
    TOAST_HIDE
} from "../../constants";

export const hideToast = () => {
    return (dispatch) => {
          dispatch({
                type: TOAST_HIDE,
          });
    };
};