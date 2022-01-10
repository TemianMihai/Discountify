import React from "react";
import Router from "./Router";
import Apollo from "./Apollo";
import OuterErrorBoundary from "./OuterErrorBoundary";


const Root: React.FC = () => {
  return (
      <OuterErrorBoundary>
        <Apollo>
          <Router />
        </Apollo>
      </OuterErrorBoundary>
  );
};

export default Root;
