import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No episodes yet",
  description = "Start creating your first radio show script to get started.",
  actionLabel = "Create New Episode",
  onAction,
  icon = "Radio"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6 waveform-pattern">
        <ApperIcon name={icon} size={40} className="text-primary" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md">{description}</p>
      
      {onAction && (
        <Button onClick={onAction} size="lg" className="flex items-center space-x-2">
          <ApperIcon name="Plus" size={18} />
          <span>{actionLabel}</span>
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;