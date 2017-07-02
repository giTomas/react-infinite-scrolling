import R from 'ramda';
import { fetchImage } from '../http/fetch';

export const mapIndexed = R.addIndex(R.map);
export const isNotFalse = n => n && n;
export const filterNulls = R.filter(isNotFalse);
export const mapToFetchImage = R.map(fetchImage);
export const nextSequence = R.map(R.add(16));
