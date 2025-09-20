import React from "react";

interface ErrorObject {
  message: string;
  [key: string]: any;
}

interface ErrorMessageProps {
  error: ErrorObject | null;
  fullscreen?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  fullscreen = false,
}) => {
  if (!error) return null;

  const content = (
    <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-md border border-destructive bg-destructive/10 text-destructive">
      <svg
        className="w-6 h-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span className="font-medium">Something went wrong</span>
      <p className="text-sm opacity-80">{error.message}</p>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
        {content}
      </div>
    );
  }

  return content;
};

export default ErrorMessage;
