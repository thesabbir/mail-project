import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  storage,
  key: 'state',
  whitelist: []
};

/**
 *
 * @param rootReducer
 * @returns {Reducer<PersistPartial, Action>}
 */
export const createPersistReducer = rootReducer =>
  persistReducer(persistConfig, rootReducer);
