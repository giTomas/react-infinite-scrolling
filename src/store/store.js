import { createStore } from 'redux';
import infiniteScrollReducer from '../reducers/reducers';

const store = createStore(infiniteScrollReducer);

export default store;
