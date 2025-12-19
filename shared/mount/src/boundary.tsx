import type { PropsWithChildren } from 'react';
import * as React from 'react';

interface IBoundaryProps {
  fallback?: React.ReactNode;
}

interface IBoundaryState {
  hasError: boolean;
}

class Boundary extends React.Component<
  PropsWithChildren<IBoundaryProps>,
  IBoundaryState
> {
  constructor(props: PropsWithChildren<IBoundaryProps>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // TODO: log error to error reporting service
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback === undefined) {
        return <DefaultBoundaryFallback />;
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const DefaultBoundaryFallback = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 400 }}>
      <div
        style={{
          position: 'absolute',

          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <h1>Something went wrong</h1>
        <p>Please try again later.</p>
        <p>If the issue persists, please report to your administrator.</p>
      </div>
    </div>
  );
};

export const ErrorBoundary = ({
  fallback,
  children,
}: PropsWithChildren<IBoundaryProps>) => {
  return <Boundary fallback={fallback}>{children}</Boundary>;
};
