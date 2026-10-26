import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught runtime error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf7] p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#e8d697] shadow-sm space-y-4">
            <div className="size-14 mx-auto bg-[#ffefb3] text-[#013e37] rounded-2xl flex items-center justify-center border border-[#e8d697]">
              <AlertTriangle className="size-7 text-[#013e37]" />
            </div>
            <h1 className="text-xl font-extrabold text-[#013e37]">Something went wrong</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              An unexpected application error occurred. We have logged the incident and you can reload the page or return home.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-2.5 bg-[#013e37] hover:bg-[#012a25] active:scale-95 text-[#ffefb3] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#ffefb3]/30 shadow-xs"
              >
                <RefreshCw className="size-3.5" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-2.5 border border-[#013e37]/30 hover:bg-[#ffefb3]/40 active:scale-95 text-[#013e37] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Home className="size-3.5" />
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
