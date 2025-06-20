// 📁 src/components/IconPicker.jsx
import React, { useMemo } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";

// 🔍 All icons for suggestions
const allIcons = {
  ...FaIcons,
  ...SiIcons,
  ...MdIcons,
  ...GiIcons,
};

const getIconComponent = (iconName) => {
  const Icon = allIcons[iconName];
  return Icon ? <Icon className="inline-block mr-1" /> : null;
};

const IconPicker = ({ value, onChange }) => {
  const suggestions = useMemo(() => {
    if (!value || value.length < 2) return [];
    return Object.keys(allIcons)
      .filter((key) => key.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
  }, [value]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter icon name (e.g. FaNodeJs)"
        className={`w-full px-2 py-1 border ${
          getIconComponent(value) ? "border-gray-300" : "border-red-400"
        } rounded text-xs pr-10`}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
        {getIconComponent(value) || (
          <span className="text-xs text-red-500">✖</span>
        )}
      </span>

      {value.length >= 2 && !getIconComponent(value) && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded shadow max-h-40 overflow-y-auto text-xs">
          {suggestions.length > 0 ? (
            suggestions.map((name) => (
              <div
                key={name}
                onClick={() => onChange(name)}
                className="cursor-pointer px-3 py-1 hover:bg-cyan-100 dark:hover:bg-slate-600 flex items-center gap-2"
              >
                {getIconComponent(name)}
                <span>{name}</span>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default IconPicker;
