import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";

const Templates = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ApperIcon name="FileText" size={24} className="text-primary" />
          <span>Show Templates</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto waveform-pattern">
            <ApperIcon name="FileText" size={40} className="text-primary" />
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Templates Coming Soon</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We're working on pre-built templates for different show formats. Check back soon for news shows, talk shows, music programs, and more!
          </p>
          
          <Button onClick={() => window.history.back()} className="flex items-center space-x-2">
            <ApperIcon name="ArrowLeft" size={18} />
            <span>Go Back</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Templates;