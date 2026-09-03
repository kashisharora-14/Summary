import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Investigation dashboard failed to render:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-[100dvh] items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md rounded-xl border border-red-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-red-600">The investigation board could not load</p>
            <p className="mt-2 break-words font-mono text-xs text-gray-500">{this.state.error.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
);
