import React, { useState } from "react";
import { getTheme } from "../../config/them.config";
import { FaChevronDown } from "react-icons/fa";

type DropDownProps = {
  options: string[];
  onSelect: (option: string) => void;
};

const DropDown: React.FC<DropDownProps> = ({ options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const theme = getTheme("light");

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onSelect(opt);
    setOpen(false);
  };

  return (
    <div className="relative w-48">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded-lg p-2 text-left flex justify-between items-center"
        style={{
          borderColor: theme.borderColor.primary,
          backgroundColor: theme.background.secondary,
        }}
      >
        {selected} <FaChevronDown className="ml-2" />
      </button>

      {open && (
        <div className="absolute mt-1 w-full border rounded-lg shadow bg-white z-10">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className="p-2 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
