import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { initialState, rootSaga, rootReducer } from "./redux";

// ENV check
const dev = process.env.NODE_ENV !== "production";

/*
 * Middleware compose
 */
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];
if (dev) {
  middleware.push(createLogger());
}

/**
 *
 * @param preloadedState
 * @returns {EnhancedStore<{app: {}}, Action, (*|Middleware)[]>}
 */
export const useReduxStore = (preloadedState = initialState) => {
  // see redux-toolkit docs
  const store = configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: middleware,
    devTools: dev,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

/**
 *
 * @param store
 * @returns {Persistor}
 */
export const usePersistor = (store) => persistStore(store);
