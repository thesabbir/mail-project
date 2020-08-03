import React from "react";
import AppRoutes from "./AppRoutes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { usePersistor, useReduxStore } from "./store";
import SuspenseLoader from "./components/SuspenseLoader";

export default function App() {
  const store = useReduxStore();
  const storePersistor = usePersistor(store);
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate persistor={storePersistor} loading={<SuspenseLoader />}>
          <AppRoutes />
        </PersistGate>
      </Provider>
      <CssBaseline />
    </React.Fragment>
  );
}
