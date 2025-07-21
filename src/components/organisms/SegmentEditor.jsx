import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import SegmentCard from "@/components/molecules/SegmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";

const SegmentEditor = ({ segments, onUpdate, onPreview, onSave, episode }) => {
  const [localSegments, setLocalSegments] = useState(segments);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    setLocalSegments(segments);
  }, [segments]);

  useEffect(() => {
    const total = localSegments.reduce((sum, segment) => sum + segment.duration, 0);
    setTotalDuration(total);
  }, [localSegments]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(localSegments);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setLocalSegments(updatedItems);
    onUpdate(updatedItems);
  };

  const handleSegmentUpdate = (segmentId, updatedSegment) => {
    const updatedSegments = localSegments.map(segment =>
      segment.Id === segmentId ? updatedSegment : segment
    );
    setLocalSegments(updatedSegments);
    onUpdate(updatedSegments);
  };

  const handleSegmentDelete = (segmentId) => {
    const filteredSegments = localSegments.filter(segment => segment.Id !== segmentId);
    const reorderedSegments = filteredSegments.map((segment, index) => ({
      ...segment,
      order: index + 1
    }));
    setLocalSegments(reorderedSegments);
    onUpdate(reorderedSegments);
  };

  const addNewSegment = () => {
    const newSegment = {
      Id: Math.max(...localSegments.map(s => s.Id), 0) + 1,
      title: "New Segment",
      duration: 5,
      talkingPoints: ["Add your talking points here"],
      order: localSegments.length + 1,
      type: "content"
    };
    const updatedSegments = [...localSegments, newSegment];
    setLocalSegments(updatedSegments);
    onUpdate(updatedSegments);
  };

  if (!localSegments.length) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <ApperIcon name="Radio" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No segments generated yet</h3>
            <p className="text-gray-600">Generate segments from your theme to start editing.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <ApperIcon name="Edit3" size={24} className="text-primary" />
            <span>Edit Segments</span>
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Badge variant={totalDuration <= 60 ? "success" : "warning"}>
                <ApperIcon name="Clock" size={14} className="mr-1" />
                {totalDuration} min
              </Badge>
              <Badge variant="outline">
                {localSegments.length} segments
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={addNewSegment}
                size="sm"
              >
                <ApperIcon name="Plus" size={16} className="mr-1" />
                Add Segment
              </Button>
              <Button
                onClick={onSave}
                size="sm"
                className="hidden sm:flex"
              >
                <ApperIcon name="Save" size={16} className="mr-1" />
                Save Draft
              </Button>
              <Button
                onClick={onPreview}
                variant="accent"
                size="sm"
              >
                <ApperIcon name="Eye" size={16} className="mr-1" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="segments">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                <AnimatePresence>
                  {localSegments.map((segment, index) => (
                    <Draggable
                      key={segment.Id}
                      draggableId={segment.Id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <SegmentCard
                            segment={segment}
                            index={index}
                            onUpdate={handleSegmentUpdate}
                            onDelete={handleSegmentDelete}
                            isDragging={snapshot.isDragging}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {totalDuration > 60 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="AlertTriangle" size={16} className="text-warning" />
              <p className="text-sm text-warning font-medium">
                Show duration is {totalDuration} minutes (exceeds 60 min target)
              </p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default SegmentEditor;