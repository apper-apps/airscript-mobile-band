import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

const SegmentCard = ({ 
  segment, 
  onUpdate, 
  onDelete, 
  isDragging = false,
  dragHandleProps = {},
  index
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(segment.title);
  const [editedPoints, setEditedPoints] = useState(segment.talkingPoints);

  const handleSave = () => {
    onUpdate(segment.Id, {
      ...segment,
      title: editedTitle,
      talkingPoints: editedPoints
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(segment.title);
    setEditedPoints(segment.talkingPoints);
    setIsEditing(false);
  };

  const addTalkingPoint = () => {
    setEditedPoints([...editedPoints, ""]);
  };

  const updateTalkingPoint = (pointIndex, value) => {
    const newPoints = [...editedPoints];
    newPoints[pointIndex] = value;
    setEditedPoints(newPoints);
  };

  const removeTalkingPoint = (pointIndex) => {
    const newPoints = editedPoints.filter((_, i) => i !== pointIndex);
    setEditedPoints(newPoints);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg border-2 shadow-sm transition-all duration-200",
        isDragging ? "border-primary shadow-lg rotate-1" : "border-gray-200 hover:border-primary/50 hover:shadow-md"
      )}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <div
              {...dragHandleProps}
              className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md cursor-grab active:cursor-grabbing hover:bg-gray-200 transition-colors"
            >
              <ApperIcon name="GripVertical" size={16} className="text-gray-600" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="font-medium"
                  placeholder="Segment title"
                />
              ) : (
                <h3 className="font-medium text-gray-900 text-lg">{segment.title}</h3>
              )}
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="accent">{segment.duration} min</Badge>
                <Badge variant="outline">Segment {index + 1}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="text-success hover:bg-success/10"
                >
                  <ApperIcon name="Check" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="text-gray-600 hover:bg-gray-100"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-gray-600 hover:bg-gray-100"
                >
                  <ApperIcon name="Edit3" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(segment.Id)}
                  className="text-error hover:bg-error/10"
                >
                  <ApperIcon name="Trash2" size={16} />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 flex items-center">
            <ApperIcon name="List" size={14} className="mr-2" />
            Talking Points
          </h4>
          {isEditing ? (
            <div className="space-y-2">
              {editedPoints.map((point, pointIndex) => (
                <div key={pointIndex} className="flex items-center space-x-2">
                  <Input
                    value={point}
                    onChange={(e) => updateTalkingPoint(pointIndex, e.target.value)}
                    placeholder="Enter talking point"
                    className="flex-1 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTalkingPoint(pointIndex)}
                    className="text-error hover:bg-error/10 shrink-0"
                  >
                    <ApperIcon name="X" size={14} />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={addTalkingPoint}
                className="text-primary hover:bg-primary/10 w-full justify-center"
              >
                <ApperIcon name="Plus" size={14} className="mr-1" />
                Add Point
              </Button>
            </div>
          ) : (
            <ul className="space-y-1">
              {segment.talkingPoints.map((point, pointIndex) => (
                <li key={pointIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="flex-1">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SegmentCard;