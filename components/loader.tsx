import React from "react";

type LoaderSize = "small" | "medium" | "large";
type LoaderVariant = "spinner" | "dots";
type LoaderColor = "primary" | "secondary" | "accent" | "muted" | "foreground";

interface LoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  color?: LoaderColor;
  fullscreen?: boolean;
}

const sizeMap: Record<LoaderSize, string> = {
  small: "w-5 h-5",
  medium: "w-10 h-10",
  large: "w-16 h-16",
};

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  variant = "spinner",
  color = "primary",
  fullscreen = false,
}) => {
  const sizeClass = sizeMap[size];

  const content =
    variant === "spinner" ? (
      <div
        className={`${sizeClass} border-4 border-muted border-t-${color} rounded-full animate-spin`}
      />
    ) : (
      <div className="flex space-x-2">
        <span
          className={`w-2 h-2 rounded-full bg-${color} animate-bounce-dot`}
        />
        <span
          className={`w-2 h-2 rounded-full bg-${color} animate-bounce-dot [animation-delay:0.2s]`}
        />
        <span
          className={`w-2 h-2 rounded-full bg-${color} animate-bounce-dot [animation-delay:0.4s]`}
        />
      </div>
    );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
