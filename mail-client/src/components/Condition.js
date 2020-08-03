import React from "react";

export default function Condition({ check, children }) {
  return check === true ? children : null;
}
