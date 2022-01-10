import React from "react";

/**
 * Types
 */
interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface State {
  error: boolean;
}

class OuterErrorBoundary extends React.Component<Props, State> {
  state = {
    error: false
  };

  static getDerivedStateFromError(): State {
    return {
      error: true
    };
  }

  componentDidCatch(error: Error): void {
    console.warn(error);
  }

  render(): React.ReactNode | JSX.Element {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <>{error}</>;
    }
    return <>{children}</>;
  }
}

export default OuterErrorBoundary;
