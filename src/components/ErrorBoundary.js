// ErrorBoundary.js
import React, { Component } from "react";

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error info to an external service or display it
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI if an error occurred
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error ? this.state.error.message : ""}</p>
          <p>{this.state.errorInfo ? this.state.errorInfo.componentStack : ""}</p>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
