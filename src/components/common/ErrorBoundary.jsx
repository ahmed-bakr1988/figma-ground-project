import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * ================================
 * Error Boundary Component
 * ================================
 * يلتقط الأخطاء في الـ Components ويعرض واجهة بديلة
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // يمكن إرسال الخطأ لخدمة تتبع الأخطاء هنا
    // مثل Sentry أو LogRocket
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
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
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-gray-900 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
            {/* أيقونة التحذير */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            
            {/* العنوان */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              عذراً، حدث خطأ غير متوقع
            </h1>
            <p className="text-gray-600 mb-2">
              Something went wrong
            </p>
            
            {/* الوصف */}
            <p className="text-gray-500 text-sm mb-8">
              نعتذر عن هذا الخطأ. يرجى إعادة تحميل الصفحة أو العودة للرئيسية.
            </p>
            
            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                إعادة تحميل
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                الصفحة الرئيسية
              </button>
            </div>
            
            {/* معلومات الخطأ للمطورين (فقط في development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  تفاصيل الخطأ (للمطورين)
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs text-red-600 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
