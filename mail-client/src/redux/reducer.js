import { combineReducers } from "redux";
import { appReducer } from "./appSlice";
import { createPersistReducer } from "./persist";
import { setupSlice } from "./setupSlice";
import mailSlice from "./mailSlice";

const reducer = combineReducers({
  app: appReducer,
  setup: setupSlice.reducer,
  mails: mailSlice.reducer,
});

/**
 *  make persist/offline reducer
 *  TO update persist settings see `src/redux/persist`
 * @type {Reducer<PersistPartial, Action>}
 */

export const rootReducer = createPersistReducer(reducer);
