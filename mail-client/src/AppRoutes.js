import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Setup } from "./pages";
import SuspenseLoader from "./components/SuspenseLoader";

const AppRoutes = () => (
  <React.Fragment>
    <Router>
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </Suspense>
    </Router>
  </React.Fragment>
);

export default AppRoutes;
