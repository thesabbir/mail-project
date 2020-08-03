import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Setup, Read, Compose } from "./pages";
import SuspenseLoader from "./components/SuspenseLoader";

const AppRoutes = () => (
  <React.Fragment>
    <Router>
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/read/:sequence" element={<Read />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </Suspense>
    </Router>
  </React.Fragment>
);

export default AppRoutes;
