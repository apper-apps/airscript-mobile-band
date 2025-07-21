import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const TonePreset = ({ tone, selected, onClick, icon, description }) => {
  return (
    <button
      onClick={() => onClick(tone)}
      className={cn(
        "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 text-left w-full hover:scale-[1.02]",
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-gray-200 bg-white hover:border-primary/50"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full",
        selected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
      )}>
        <ApperIcon name={icon} size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 capitalize">{tone}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
};

export default TonePreset;