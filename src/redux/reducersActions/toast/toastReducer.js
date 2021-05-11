
import { TOAST_ERROR, TOAST_WARNING, TOAST_SUCCESS, TOAST_HIDE} from "../../constants";
const initialState = {
      message: null,
      appearance: null
};

const toastReducer = (state = initialState, action) => {
      switch (action.type) {
            case TOAST_ERROR:
                  return {
                        ...state,
                        message: action.payload,
                        appearance: 'error'
                  };
            case TOAST_WARNING:
                  return {
                        ...state,
                        message: action.payload,
                        appearance: 'warning'
                  }
            case TOAST_SUCCESS:
                  return {
                        ...state,
                        message: action.payload,
                        appearance: 'success'
                  }
            case TOAST_HIDE:
                  return {
                        ...state,
                        message: null,
                        appearance: null
                  }
            default:
                  return {
                        ...state,
                  };
      }
};

export default toastReducer;
