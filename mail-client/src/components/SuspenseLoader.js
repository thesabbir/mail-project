import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function SuspenseLoader() {
  return (
    <LinearProgress
      variant="indeterminate"
      color="secondary"
      style={{
        position: "absolute",
        width: "100vw",
        top: 0,
        left: 0,
      }}
    />
  );
}
