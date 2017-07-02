import {
  ADD_BLOBS,
  SET_W_HEIGHT,
  TOGGLE_NOT_LOADING,
  SET_NEW_SEQUENCE,
  SET_ERROR_MSG,
  CLEAR_ERROR_MSG
} from '../actions/actions';

// Actions describe the fact that something happened, but don't specify how the application's state changes in response.

export function addBlobs(blobs) {
  return {
    type: ADD_BLOBS,
    blobs,
  }
}

export function setWHeight(wHeight) {
  return {
    type: SET_W_HEIGHT,
    wHeight,
  }
}

export function toggleNotLoading() {
  return {
    type: TOGGLE_NOT_LOADING,
  }
}

export function setNewSequence(sequence) {
  return {
    type: SET_NEW_SEQUENCE,
    sequence,
  }
}

export function setErrorMsg(msg) {
  return {
    type: SET_ERROR_MSG,
    error: msg,
  }
}

export function clearErrorMsg() {
  return {
    type: CLEAR_ERROR_MSG,
    error: false,
  }
}
