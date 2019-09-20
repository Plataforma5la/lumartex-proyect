import {
  FETCH_CONFIG_BEGIN,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE
} from "./actions";

const initialState = {
  config: {},
  loading: false,
  error: null
};

export default function configReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONFIG_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CONFIG_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        config: action.payload.config
      };

    case FETCH_CONFIG_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        config: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
