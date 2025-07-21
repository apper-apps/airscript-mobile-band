import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary"
      />
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          <ApperIcon name="Radio" className="inline mr-2" size={20} />
          {message}
        </h3>
        <p className="text-sm text-gray-600">Crafting your perfect radio show...</p>
      </div>
    </div>
  );
};

export const SegmentSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-8 h-8 bg-gray-200 rounded-md" />
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded-full w-16" />
              <div className="h-6 bg-gray-200 rounded-full w-20" />
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-8 h-8 bg-gray-200 rounded" />
          <div className="w-8 h-8 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-200 rounded-full" />
            <div className="h-3 bg-gray-200 rounded flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;