import { combineReducers } from "redux";
import { appReducer } from "./appSlice";
import { createPersistReducer } from "./persist";

const reducer = combineReducers({
  app: appReducer,
});

/**
 *  make persist/offline reducer
 *  TO update persist settings see `src/redux/persist`
 * @type {Reducer<PersistPartial, Action>}
 */

export const rootReducer = createPersistReducer(reducer);
