import {
  ADD_BLOBS,
  SET_W_HEIGHT,
  TOGGLE_NOT_LOADING,
  SET_NEW_SEQUENCE,
  SET_ERROR_MSG,
  CLEAR_ERROR_MSG
} from '../actions/actions';
// import {
//   addBlobs,
//   setWHeight,
//   toggleNotLoading,
//   setNewSequence,
//   setErrorMsg,
//   clearErrorMsg,
// } from '../actionCreators/actionCreators';

//Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of reducers.

const initialState = {
  sequence: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  blobs: [],
  notLoading: true,
  wHeight: null,
  error: false,
};

function infiniteScrollReducer(state=initialState, action) {
  switch (action.type) {
    case ADD_BLOBS:
      return {
        ...state,
        blobs: [...state.blobs, ...action.blobs],
      };
    case SET_W_HEIGHT:
      return {
        ...state,
        wHeight: action.wHeight,
      };
    case TOGGLE_NOT_LOADING:
      return {
        ...state,
        notLoading: !state.notLoading,
      };
    case SET_NEW_SEQUENCE:
      return {
        ...state,
        sequence: action.sequence,
      };
    case SET_ERROR_MSG:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR_ERROR_MSG:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
}

export default infiniteScrollReducer;
