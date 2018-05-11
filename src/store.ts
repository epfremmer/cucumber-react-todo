import { createStore } from 'redux'
import { reducers } from '@app/reducers';

export const store = createStore(reducers);
