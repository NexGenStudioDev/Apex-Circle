import React from "react";

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  width?: string;
  height?: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({
  text,
  icon,
  onClick,
  disabled,
  width,
  height,
}: ButtonProps) => {
  return (
    <div className="mx-[2vw]">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg flex items-center ${disabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        style={{
          width: width || "auto",
          height: height || "auto",
        }}
      >
        {icon && <span className="Icon mr-2 inline h-fit w-fit">{icon}</span>}
        {text}
      </button>
    </div>
  );
};

export default Button;
