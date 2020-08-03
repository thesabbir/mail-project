import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function SuspenseLoader() {
  return (
    <LinearProgress
      variant="indeterminate"
      color="secondary"
      style={{
        position: "absolute",
        width: "100%",
        top: 0,
      }}
    />
  );
}
