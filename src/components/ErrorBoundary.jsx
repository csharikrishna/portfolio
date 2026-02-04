import React from 'react';
import { 
  FaExclamationTriangle, 
  FaHome, 
  FaRedo, 
  FaEnvelope,
  FaBug 
} from 'react-icons/fa';
import '../styles/ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
      timestamp: null
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      timestamp: new Date().toISOString()
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Optional: Send error to logging service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // Implement your error logging service here
    // Example: Sentry, LogRocket, or custom API
    if (import.meta.env.MODE === 'production') {
      // logToSentry(error, errorInfo);
      console.log('Error logged to service');
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  copyErrorDetails = () => {
    const errorDetails = `
Error: ${this.state.error?.toString()}
Timestamp: ${this.state.timestamp}
Component Stack: ${this.state.errorInfo?.componentStack}
    `.trim();

    navigator.clipboard.writeText(errorDetails).then(() => {
      alert('Error details copied to clipboard!');
    });
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.MODE === 'development';
      const errorMessage = this.state.error?.message || 'Unknown error';

      return (
        <div className="error-boundary">
          {/* Background Decoration */}
          <div className="error-bg-decoration" aria-hidden="true">
            <div className="error-blob error-blob-1"></div>
            <div className="error-blob error-blob-2"></div>
          </div>

          <div className="error-content">
            {/* Error Icon */}
            <div className="error-icon-wrapper">
              <FaExclamationTriangle className="error-icon" aria-hidden="true" />
              <div className="error-icon-ring"></div>
              <div className="error-icon-ring error-icon-ring-delay"></div>
            </div>

            {/* Error Title */}
            <h1 className="error-title">Oops! Something Went Wrong</h1>
            
            {/* Error Message */}
            <p className="error-message">
              We encountered an unexpected error. Don't worry, your data is safe and we're working to fix this!
            </p>

            {/* Error Count Badge (if multiple errors) */}
            {this.state.errorCount > 1 && (
              <div className="error-count-badge">
                <FaBug aria-hidden="true" />
                <span>Multiple errors detected ({this.state.errorCount})</span>
              </div>
            )}

            {/* Development Error Details */}
            {isDevelopment && this.state.error && (
              <details className="error-details">
                <summary>
                  <span className="error-details-icon">🔍</span>
                  Error Details (Development Mode)
                </summary>
                <div className="error-details-content">
                  <div className="error-info-section">
                    <h3>Error Message</h3>
                    <pre className="error-code">
                      <code>{errorMessage}</code>
                    </pre>
                  </div>

                  {this.state.errorInfo?.componentStack && (
                    <div className="error-info-section">
                      <h3>Component Stack</h3>
                      <pre className="error-code">
                        <code>{this.state.errorInfo.componentStack}</code>
                      </pre>
                    </div>
                  )}

                  <button 
                    onClick={this.copyErrorDetails}
                    className="copy-error-btn"
                    aria-label="Copy error details"
                  >
                    📋 Copy Error Details
                  </button>
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="error-actions">
              <button
                onClick={this.handleReload}
                className="error-button primary"
                aria-label="Reload the page"
              >
                <FaRedo className="button-icon" />
                <span>Reload Page</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="error-button secondary"
                aria-label="Go to home page"
              >
                <FaHome className="button-icon" />
                <span>Go Home</span>
              </button>
            </div>

            {/* Contact Support */}
            <div className="error-footer">
              <p className="error-contact">
                Problem persists? 
                <a href="#contact" className="contact-link">
                  <FaEnvelope className="contact-icon" />
                  Contact me
                </a>
              </p>
              
              {this.state.timestamp && (
                <p className="error-timestamp">
                  Error occurred at: {new Date(this.state.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
