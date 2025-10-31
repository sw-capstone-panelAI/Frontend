// components/ui/Button.jsx
import React from "react";

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
