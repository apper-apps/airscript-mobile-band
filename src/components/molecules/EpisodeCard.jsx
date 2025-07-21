import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const EpisodeCard = ({ episode, onLoad, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg border-2 border-gray-200 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onLoad(episode)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 text-lg line-clamp-2 flex-1 mr-2">
            {episode.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(episode.Id);
            }}
            className="text-gray-500 hover:text-error hover:bg-error/10 shrink-0"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{episode.theme}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="capitalize">
              {episode.tone}
            </Badge>
            <Badge variant="outline">
              {episode.segments?.length || 0} segments
            </Badge>
          </div>
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(episode.updatedAt), { addSuffix: true })}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <ApperIcon name="Clock" size={14} />
            <span>{episode.totalDuration} min</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <ApperIcon name="Users" size={14} />
            <span className="capitalize">{episode.audience}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EpisodeCard;